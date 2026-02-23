require('dotenv').config();

let mssql = null;
let hasMssql = false;
try {
  // require lazily so the app can run without the package installed
  mssql = require('mssql');
  hasMssql = true;
} catch (err) {
  hasMssql = false;
}

const config = {
  user: process.env.MSSQL_USER || 'sa',
  password: process.env.MSSQL_PASSWORD || 'Your_password123',
  server: process.env.MSSQL_SERVER || 'localhost',
  port: process.env.MSSQL_PORT || 1433,  // Use TCP port directly if available
  database: process.env.MSSQL_DATABASE || 'connex_dev',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: parseInt(process.env.MSSQL_POOL_MAX || '10', 10),
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;
const isConfigured = hasMssql && !!(process.env.MSSQL_SERVER || process.env.MSSQL_DATABASE || process.env.MSSQL_USER);

async function connect() {
  if (!hasMssql) {
    throw new Error('mssql package not installed');
  }
  if (pool) return pool;
  try {
    pool = await mssql.connect(config);
    return pool;
  } catch (err) {
    // do not crash the app; caller will fallback
    pool = null;
    throw err;
  }
}

module.exports = {
  mssql,
  config,
  connect,
  getPool: () => pool,
  isConfigured,
  _hasMssql: hasMssql,
};
