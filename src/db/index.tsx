
import { drizzle } from 'drizzle-orm/node-postgres'; 
import { Pool } from 'pg'; 
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Sử dụng chuỗi kết nối từ biến môi trường
});

export const db = drizzle(pool, { schema });

process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Database connection pool closed');
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Database connection pool closed');
    process.exit(0);
  });
});



