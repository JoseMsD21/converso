const { connect, mssql, config } = require('./sqlServer');

async function createDatabaseIfNotExists() {
  try {
    // Connect to master database first (to create connex_dev if needed)
    const masterConfig = { ...config, database: 'master' };
    const masterPool = await mssql.connect(masterConfig);
    const dbName = process.env.MSSQL_DATABASE || 'connex_dev';
    
    // Check if database exists and create if it doesn't
    const checkDb = `SELECT * FROM sys.databases WHERE name = '${dbName}'`;
    const result = await masterPool.request().query(checkDb);
    
    if (result.recordset.length === 0) {
      console.log(`Creating database: ${dbName}`);
      await masterPool.request().query(`CREATE DATABASE [${dbName}]`);
      console.log(`✓ Database ${dbName} created`);
    } else {
      console.log(`✓ Database ${dbName} already exists`);
    }
    
    await masterPool.close();
  } catch (err) {
    // If user doesn't have permission to create DB, continue (DB might already exist)
    console.warn(`Note: Database creation skipped (${err.message}). Continuing with table creation...`);
  }
}

async function initDb() {
  try {
    // First, create database if it doesn't exist
    await createDatabaseIfNotExists();
    
    const pool = await connect();

    // users table
    const createUsers = `
      IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
      BEGIN
        CREATE TABLE [dbo].[users] (
          id NVARCHAR(50) PRIMARY KEY,
          username NVARCHAR(100) NOT NULL UNIQUE,
          passwordHash NVARCHAR(200) NOT NULL,
          createdAt DATETIME2 DEFAULT SYSUTCDATETIME()
        )
      END
    `;

    // agents table (team members)
    const createAgents = `
      IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[agents]') AND type in (N'U'))
      BEGIN
        CREATE TABLE [dbo].[agents] (
          id NVARCHAR(50) PRIMARY KEY,
          name NVARCHAR(100) NOT NULL,
          email NVARCHAR(100) NULL,
          status NVARCHAR(20) DEFAULT 'available',
          createdAt DATETIME2 DEFAULT SYSUTCDATETIME()
        )
      END
    `;

    // conversations table
    const createConversations = `
      IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[conversations]') AND type in (N'U'))
      BEGIN
        CREATE TABLE [dbo].[conversations] (
          id NVARCHAR(50) PRIMARY KEY,
          name NVARCHAR(200) NULL,
          participantId NVARCHAR(100) NULL,
          channel NVARCHAR(50) NULL,
          lastMessage NVARCHAR(MAX) NULL,
          assignedTo NVARCHAR(50) NULL,
          status NVARCHAR(20) DEFAULT 'open',
          createdAt DATETIME2 DEFAULT SYSUTCDATETIME(),
          CONSTRAINT FK_Conversations_Agents FOREIGN KEY (assignedTo) REFERENCES dbo.agents(id)
        )
      END
    `;

    // messages table
    const createMessages = `
      IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[messages]') AND type in (N'U'))
      BEGIN
        CREATE TABLE [dbo].[messages] (
          id NVARCHAR(50) PRIMARY KEY,
          conversationId NVARCHAR(50) NOT NULL,
          senderId NVARCHAR(100) NULL,
          content NVARCHAR(MAX) NULL,
          createdAt DATETIME2 DEFAULT SYSUTCDATETIME(),
          CONSTRAINT FK_Messages_Conversations FOREIGN KEY (conversationId) REFERENCES dbo.conversations(id)
        )
      END
    `;

    await pool.request().query(createAgents);
    console.log('✓ Table [agents] ready');

    await pool.request().query(createConversations);
    console.log('✓ Table [conversations] ready');
    
    await pool.request().query(createMessages);
    console.log('✓ Table [messages] ready');

    console.log('\n✓ SQL Server: base de datos y tablas inicializadas correctamente');
    return true;
  } catch (err) {
    console.error('✗ SQL Server: error al inicializar:', err.message || err);
    return false;
  }
}

if (require.main === module) {
  // ejecútalo con: node src/db/initDb.js
  initDb().then(ok => process.exit(ok ? 0 : 1));
}

module.exports = { initDb };
