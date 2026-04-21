# Database Setup

The app is wired for Postgres through Netlify DB/Neon and Drizzle.

## Environment

Set one of these variables:

```env
NETLIFY_DATABASE_URL="postgresql://..."
DATABASE_URL="postgresql://..."
```

Netlify DB can create and inject `NETLIFY_DATABASE_URL` automatically when `@netlify/neon` is installed and the project builds on Netlify.

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
