import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb, hasDatabaseUrl, users } from '@/lib/db';
import { createClient, hasSupabaseAuthEnv } from '@/utils/supabase/server';

const AVATAR_COLORS = ['#1e2a35', '#d97757', '#4a7c59', '#8b6f47', '#2a4a6b', '#6b5b8e'];
const POSITION_SET = new Set(['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF']);

export const runtime = 'nodejs';

function normalizeContact(contact) {
  return String(contact || '').trim().toLowerCase();
}

function isEmail(contact) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
}

function passwordFromProfile(profile) {
  return `TPC-${profile.contact}-${profile.zip}`.slice(0, 72);
}

function avatarFor(name) {
  const seed = String(name || 'player').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[seed % AVATAR_COLORS.length];
}

function validateProfile(body) {
  const name = String(body?.name || '').trim();
  const contact = normalizeContact(body?.contact);
  const zip = String(body?.zip || '').trim();
  const accountType = body?.accountType === 'host' ? 'host' : 'player';
  const positions = Array.isArray(body?.positions)
    ? body.positions.filter(pos => POSITION_SET.has(pos)).slice(0, 3)
    : [];

  if (!name) return { error: 'Name is required.' };
  if (!contact) return { error: 'Email or phone is required.' };
  if (!zip) return { error: 'Home ZIP is required.' };
  if (positions.length === 0) return { error: 'Pick at least one position.' };

  return { name, contact, zip, accountType, positions };
}

function userPayload(user, persisted) {
  return {
    id: user.id,
    name: user.name,
    contact: user.contact,
    zip: user.zip,
    accountType: user.accountType,
    positions: user.positions,
    avatarColor: user.avatarColor,
    authUserId: user.authUserId,
    persisted,
  };
}

export async function POST(request) {
  let profile;

  try {
    const body = await request.json().catch(() => null);
    profile = validateProfile(body);

    if (profile.error) {
      return NextResponse.json({ error: profile.error }, { status: 400 });
    }

    let authUserId = null;
    let authWarning = '';

    if (isEmail(profile.contact) && hasSupabaseAuthEnv()) {
      const supabase = await createClient();
      const password = passwordFromProfile(profile);
      let authResult = await supabase.auth.signUp({
        email: profile.contact,
        password,
        options: {
          data: {
            name: profile.name,
            zip: profile.zip,
            account_type: profile.accountType,
            positions: profile.positions,
          },
        },
      });

      if (authResult.error?.message?.toLowerCase().includes('already registered')) {
        authResult = await supabase.auth.signInWithPassword({
          email: profile.contact,
          password,
        });
      }

      if (authResult.error) {
        authWarning = authResult.error.message;
      } else {
        authUserId = authResult.data.user?.id || null;
      }
    }

    if (!hasDatabaseUrl()) {
      const user = {
        id: `local-${Date.now()}`,
        ...profile,
        avatarColor: avatarFor(profile.name),
        authUserId,
      };
      return NextResponse.json({
        user: userPayload(user, false),
        persisted: false,
        message: authWarning || 'SUPABASE_DATABASE_URL is not configured; using prototype local profile mode.',
      }, { status: 202 });
    }

    const db = getDb();
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.contact, profile.contact))
      .limit(1);

    let user;

    if (existing.length > 0) {
      [user] = existing;
      if (authUserId && !user.authUserId) {
        [user] = await db
          .update(users)
          .set({ authUserId })
          .where(eq(users.id, user.id))
          .returning();
      }
    } else {
      [user] = await db
        .insert(users)
        .values({ ...profile, authUserId, avatarColor: avatarFor(profile.name) })
        .returning();
    }

    const response = NextResponse.json({
      user: userPayload(user, true),
      persisted: true,
      message: authWarning,
    });
    response.cookies.set('pickup_user_id', user.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (error) {
    if (profile && !profile.error) {
      const user = {
        id: `local-${Date.now()}`,
        ...profile,
        avatarColor: avatarFor(profile.name),
        authUserId: null,
      };

      return NextResponse.json({
        user: userPayload(user, false),
        persisted: false,
        message: 'Database profile storage is unavailable; using prototype local profile mode.',
      }, { status: 202 });
    }

    return NextResponse.json({
      error: error.message || 'Could not create your account.',
    }, { status: 500 });
  }
}
