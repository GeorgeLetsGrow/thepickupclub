# Database Setup

The app is wired for Postgres through Neon and Drizzle.

Netlify's old Neon extension/Netlify DB beta no longer creates new databases. Use a direct Neon database connection string and add it to Netlify as an environment variable.

## Environment

Set one of these variables:

```env
DATABASE_URL="postgresql://..."
NETLIFY_DATABASE_URL="postgresql://..."
```

Use Neon’s pooled connection string for Netlify/serverless deploys. The app checks `NETLIFY_DATABASE_URL` first, then `DATABASE_URL`.

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

That runs `npm run db:deploy` before `next build`. If no database URL is configured, migration is skipped so local prototype builds still work.

## Current Tables

- `users`
- `fields`
- `games`
- `registrations`
- `messages`
- `posts`
- `payments`
