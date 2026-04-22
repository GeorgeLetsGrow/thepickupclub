import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb, hasDatabaseUrl, users } from '@/lib/db';
import {
  avatarFor, isEmail, userPayload, validateProfile,
} from '@/lib/auth-profile';
import { createClient, hasSupabaseAuthEnv } from '@/utils/supabase/server';

export const runtime = 'nodejs';

export async function POST(request) {
  let profile;

  try {
    const body = await request.json().catch(() => null);
    profile = validateProfile(body);

    if (profile.error) {
      return NextResponse.json({ error: profile.error }, { status: 400 });
    }

    const password = String(body?.password || '');
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    let authUserId = null;

    if (isEmail(profile.contact) && hasSupabaseAuthEnv()) {
      const supabase = await createClient();
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
        return NextResponse.json({ error: authResult.error.message }, { status: 400 });
      }

      authUserId = authResult.data.user?.id || null;
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
        message: 'SUPABASE_DATABASE_URL is not configured; using prototype local profile mode.',
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
      message: '',
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
