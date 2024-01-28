import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const pool = neon(process.env.DRIZZLE_DATABASE_URL!);

const db = drizzle(pool);

async function main() {
  console.log('Running migrations...');
  await migrate(db, {
    migrationsFolder: 'drizzle',
  });
  console.log('Migrations complete... exiting now!');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
