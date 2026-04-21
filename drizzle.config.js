import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local' });

const config = {
  schema: './src/lib/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL || '',
  },
};

export default config;
