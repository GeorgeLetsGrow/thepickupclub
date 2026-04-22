export const POSITION_SET = new Set(['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF']);
export const AVATAR_COLORS = ['#111827', '#f97316', '#12805c', '#a16207', '#2563eb', '#0891b2'];

export function normalizeContact(contact) {
  return String(contact || '').trim().toLowerCase();
}

export function isEmail(contact) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
}

export function avatarFor(name) {
  const seed = String(name || 'player').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[seed % AVATAR_COLORS.length];
}

export function validateProfile(body) {
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

export function userPayload(user, persisted) {
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
