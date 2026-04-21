import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb, hasDatabaseUrl, users } from '@/lib/db';
import { avatarFor, isEmail, normalizeContact, passwordFromProfile, userPayload } from '@/lib/auth-profile';
import { createClient, hasSupabaseAuthEnv } from '@/utils/supabase/server';

export const runtime = 'nodejs';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const contact = normalizeContact(body?.contact);
  const zip = String(body?.zip || '33534').trim();

  if (!contact) {
    return NextResponse.json({ error: 'Email or phone is required.' }, { status: 400 });
  }

  let authUserId = null;
  let authWarning = '';

  if (isEmail(contact) && hasSupabaseAuthEnv()) {
    const supabase = await createClient();
    const authResult = await supabase.auth.signInWithPassword({
      email: contact,
      password: passwordFromProfile({ contact, zip }),
    });

    if (authResult.error) {
      authWarning = authResult.error.message;
    } else {
      authUserId = authResult.data.user?.id || null;
    }
  }

  if (!hasDatabaseUrl()) {
    const user = {
      id: `local-${Date.now()}`,
      name: contact.split('@')[0] || 'Player',
      contact,
      zip,
      accountType: 'player',
      positions: ['SS'],
      avatarColor: avatarFor(contact),
      authUserId,
    };

    return NextResponse.json({
      user: userPayload(user, false),
      persisted: false,
      message: authWarning || 'Database profile storage is unavailable; using prototype local profile mode.',
    }, { status: 202 });
  }

  try {
    const db = getDb();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.contact, contact))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: 'No account found for that email or phone.' }, { status: 404 });
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
  } catch {
    const user = {
      id: `local-${Date.now()}`,
      name: contact.split('@')[0] || 'Player',
      contact,
      zip,
      accountType: 'player',
      positions: ['SS'],
      avatarColor: avatarFor(contact),
      authUserId,
    };

    return NextResponse.json({
      user: userPayload(user, false),
      persisted: false,
      message: 'Database profile storage is unavailable; using prototype local profile mode.',
    }, { status: 202 });
  }
}
