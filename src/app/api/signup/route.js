import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb, hasDatabaseUrl, users } from '@/lib/db';

const AVATAR_COLORS = ['#1e2a35', '#d97757', '#4a7c59', '#8b6f47', '#2a4a6b', '#6b5b8e'];
const POSITION_SET = new Set(['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF']);

export const runtime = 'nodejs';

function normalizeContact(contact) {
  return String(contact || '').trim().toLowerCase();
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
    persisted,
  };
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const profile = validateProfile(body);

  if (profile.error) {
    return NextResponse.json({ error: profile.error }, { status: 400 });
  }

  if (!hasDatabaseUrl()) {
    const user = {
      id: `local-${Date.now()}`,
      ...profile,
      avatarColor: avatarFor(profile.name),
    };
    return NextResponse.json({
      user: userPayload(user, false),
      persisted: false,
      message: 'DATABASE_URL is not configured; using prototype local profile mode.',
    }, { status: 202 });
  }

  const db = getDb();
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.contact, profile.contact))
    .limit(1);

  const [user] = existing.length > 0
    ? existing
    : await db
      .insert(users)
      .values({ ...profile, avatarColor: avatarFor(profile.name) })
      .returning();

  const response = NextResponse.json({ user: userPayload(user, true), persisted: true });
  response.cookies.set('pickup_user_id', user.id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
