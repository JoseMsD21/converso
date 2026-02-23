// Diagnostic script to test SQL Server connection options
const mssql = require('mssql');

async function testConnections() {
  console.log('🔍 Testing SQL Server connection options...\n');

  // Option 1: Named instance with instance name
  const configs = [
    {
      name: 'Named instance (SQLEXPRESS)',
      config: {
        user: 'connex_user',
        password: 'Dev_2125connex',
        server: 'localhost',
        database: 'master',
        options: {
          encrypt: false,
          trustServerCertificate: true,
          instanceName: 'SQLEXPRESS',
        },
      },
    },
    {
      name: 'TCP port 1433',
      config: {
        user: 'connex_user',
        password: 'Dev_2125connex',
        server: 'localhost',
        port: 1433,
        database: 'master',
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      },
    },
    {
      name: 'With computer name',
      config: {
        user: 'connex_user',
        password: 'Dev_2125connex',
        server: 'JoseMsD21',
        database: 'master',
        options: {
          encrypt: false,
          trustServerCertificate: true,
          instanceName: 'SQLEXPRESS',
        },
      },
    },
  ];

  for (const test of configs) {
    try {
      console.log(`Testing: ${test.name}`);
      const pool = await mssql.connect(test.config);
      const result = await pool.request().query('SELECT @@VERSION as version');
      console.log(`✓ SUCCESS: Connected to ${test.name}`);
      console.log(`  Server: ${result.recordset[0].version.substring(0, 80)}...\n`);
      await pool.close();
      return test.config; // Return first successful config
    } catch (err) {
      console.log(`✗ FAILED: ${err.message}\n`);
    }
  }

  console.log('❌ All connection attempts failed. Check SQL Server Configuration Manager:');
  console.log('  1. Enable TCP/IP protocol for SQLEXPRESS');
  console.log('  2. Configure static TCP port (e.g., 1433)');
  console.log('  3. Restart SQL Server service');
  console.log('  4. Or use Windows Authentication instead of SQL Authentication');
}

testConnections();
