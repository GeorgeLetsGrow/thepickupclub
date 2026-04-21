import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

let cachedDb;

export function hasDatabaseUrl() {
  return Boolean(connectionString);
}

export function getDb() {
  if (!connectionString) {
    throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL is not configured.');
  }

  if (!cachedDb) {
    const sql = neon(connectionString);
    cachedDb = drizzle(sql, { schema });
  }

  return cachedDb;
}

export * from './schema';
