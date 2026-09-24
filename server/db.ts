import { Pool, type PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

function usesSupabase(connectionString?: string, host?: string) {
  const target = `${connectionString || ''} ${host || ''}`.toLowerCase();
  return target.includes('supabase.co') || target.includes('supabase.com');
}

function buildPoolConfig(): PoolConfig {
  const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  const host = process.env.DB_HOST;
  const sslRequired =
    process.env.DB_SSL === 'true' ||
    usesSupabase(connectionString, host);

  const ssl = sslRequired ? { rejectUnauthorized: false } : undefined;

  if (connectionString) {
    return {
      connectionString,
      ssl,
      max: 10,
    };
  }

  return {
    host: host || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'school_cms',
    ssl,
    max: 10,
  };
}

export const pool = new Pool(buildPoolConfig());

pool.connect((err, client, release) => {
  if (err) {
    console.warn('⚠️ Database connection failed. Operating in Memory/Mock API fallback mode.');
    console.warn(`   ${err.message}`);
  } else {
    const usingSupabase = usesSupabase(process.env.DATABASE_URL || process.env.SUPABASE_DB_URL, process.env.DB_HOST);
    console.log(usingSupabase
      ? '✅ Successfully connected to Supabase PostgreSQL!'
      : '✅ Successfully connected to PostgreSQL database!');
    release();
  }
});
