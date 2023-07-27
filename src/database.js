import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'username',
  password: process.env.DB_PASSWORD || 'master password',
  database: process.env.DB_SCHEMA || 'database/schema name',
});

export default pool;
