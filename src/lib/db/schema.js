import {
  boolean, integer, jsonb, numeric, pgTable, text, timestamp, uniqueIndex, uuid, varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  authUserId: uuid('auth_user_id'),
  name: varchar('name', { length: 120 }).notNull(),
  contact: varchar('contact', { length: 180 }).notNull(),
  zip: varchar('zip', { length: 12 }).notNull(),
  accountType: varchar('account_type', { length: 32 }).notNull().default('player'),
  positions: jsonb('positions').notNull().default([]),
  avatarColor: varchar('avatar_color', { length: 24 }).notNull().default('#111827'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, table => ({
  authUserIdx: uniqueIndex('users_auth_user_idx').on(table.authUserId),
  contactIdx: uniqueIndex('users_contact_idx').on(table.contact),
}));

export const fields = pgTable('fields', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 160 }).notNull(),
  address: text('address').notNull(),
  latitude: numeric('latitude', { precision: 10, scale: 7 }),
  longitude: numeric('longitude', { precision: 10, scale: 7 }),
  approvalStatus: varchar('approval_status', { length: 32 }).notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const games = pgTable('games', {
  id: uuid('id').defaultRandom().primaryKey(),
  hostId: uuid('host_id').references(() => users.id),
  fieldId: uuid('field_id').references(() => fields.id),
  title: varchar('title', { length: 160 }).notNull(),
  sport: varchar('sport', { length: 40 }).notNull().default('baseball'),
  startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
  endsAt: timestamp('ends_at', { withTimezone: true }),
  costCents: integer('cost_cents').notNull().default(0),
  playerCap: integer('player_cap').notNull().default(18),
  notes: text('notes'),
  status: varchar('status', { length: 32 }).notNull().default('open'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const registrations = pgTable('registrations', {
  id: uuid('id').defaultRandom().primaryKey(),
  gameId: uuid('game_id').references(() => games.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  position: varchar('position', { length: 12 }),
  team: varchar('team', { length: 24 }),
  paid: boolean('paid').notNull().default(false),
  status: varchar('status', { length: 32 }).notNull().default('registered'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, table => ({
  gameUserIdx: uniqueIndex('registrations_game_user_idx').on(table.gameId, table.userId),
}));

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  gameId: uuid('game_id').references(() => games.id),
  senderId: uuid('sender_id').references(() => users.id),
  recipientId: uuid('recipient_id').references(() => users.id),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  gameId: uuid('game_id').references(() => games.id),
  kind: varchar('kind', { length: 40 }).notNull().default('highlight'),
  caption: text('caption').notNull(),
  mediaUrl: text('media_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  registrationId: uuid('registration_id').references(() => registrations.id),
  amountCents: integer('amount_cents').notNull(),
  provider: varchar('provider', { length: 40 }).notNull().default('manual'),
  providerPaymentId: varchar('provider_payment_id', { length: 160 }),
  status: varchar('status', { length: 32 }).notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
