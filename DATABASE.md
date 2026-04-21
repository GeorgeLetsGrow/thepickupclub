# Supabase Database Setup

The app is wired for Supabase Postgres through Drizzle.

Use Supabase's pooled Postgres connection string for Netlify/serverless deploys.

## Environment

In Supabase:

1. Open your project.
2. Go to **Project Settings → Database**.
3. Copy the **Connection pooling** URI.
4. Use **Transaction** mode when available.
5. Replace the password placeholder with your database password.

In Netlify, set:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_DATABASE_URL="postgresql://..."
```

Locally, add the same values to `.env.local` if you want local Supabase Auth and signup writes:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_DATABASE_URL="postgresql://..."
```

The app also accepts:

```env
DATABASE_URL="postgresql://..."
```

The app checks `SUPABASE_DATABASE_URL` first, then `DATABASE_URL`.

## Commands

```bash
npm run db:generate   # create migration files after schema edits
npm run db:migrate    # apply migrations when a database URL exists
npm run db:studio     # open Drizzle Studio
```

Netlify uses:

```bash
npm run netlify:build
```

That runs `next build`. Run migrations separately with `npm run db:migrate` after adding or changing tables.

Do not block every Netlify deploy on migrations. Supabase connection strings are easy to misconfigure, and a migration failure would otherwise take the whole site offline.

## Current Tables

- `users`
- `fields`
- `games`
- `registrations`
- `messages`
- `posts`
- `payments`
