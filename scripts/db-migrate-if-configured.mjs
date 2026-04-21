import { spawnSync } from 'node:child_process';

const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.log('No SUPABASE_DATABASE_URL or DATABASE_URL found; skipping database migration.');
  process.exit(0);
}

const npmExec = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(npmExec, ['drizzle-kit', 'migrate'], {
  stdio: 'inherit',
  shell: false,
});

process.exit(result.status ?? 1);
