const db = require('../db/sqlServer');

const agentService = {
  // Obtener todos los agentes
  async getAllAgents() {
    try {
      if (db.isConfigured) {
        const result = await db.connect().then(pool =>
          pool.request().query('SELECT id, name, email, status FROM agents ORDER BY name')
        );
        return result.recordset;
      }
      return [
        { id: '1', name: 'Agent 1', email: 'agent1@connex.io', status: 'available' },
        { id: '2', name: 'Agent 2', email: 'agent2@connex.io', status: 'available' },
      ];
    } catch (err) {
      console.error('Error fetching agents:', err);
      return [];
    }
  },

  // Crear un agente
  async createAgent(agent) {
    try {
      if (db.isConfigured) {
        const pool = await db.connect();
        const query = `
          INSERT INTO agents (id, name, email, status)
          VALUES (@id, @name, @email, @status)
        `;
        await pool.request()
          .input('id', db.mssql.TYPES.NVarChar, agent.id)
          .input('name', db.mssql.TYPES.NVarChar, agent.name)
          .input('email', db.mssql.TYPES.NVarChar, agent.email || null)
          .input('status', db.mssql.TYPES.NVarChar, agent.status || 'available')
          .query(query);
        return { success: true, agent };
      }
      return { success: true, agent };
    } catch (err) {
      console.error('Error creating agent:', err);
      return { success: false, error: err.message };
    }
  },

  // Obtener agente por ID
  async getAgentById(agentId) {
    try {
      if (db.isConfigured) {
        const pool = await db.connect();
        const result = await pool.request()
          .input('id', db.mssql.TYPES.NVarChar, agentId)
          .query('SELECT id, name, email, status FROM agents WHERE id = @id');
        return result.recordset[0] || null;
      }
      return { id: agentId, name: `Agent ${agentId}` };
    } catch (err) {
      console.error('Error fetching agent:', err);
      return null;
    }
  },

  // Actualizar estado del agente
  async updateAgentStatus(agentId, status) {
    try {
      if (db.isConfigured) {
        const pool = await db.connect();
        await pool.request()
          .input('id', db.mssql.TYPES.NVarChar, agentId)
          .input('status', db.mssql.TYPES.NVarChar, status)
          .query('UPDATE agents SET status = @status WHERE id = @id');
        return { success: true };
      }
      return { success: true };
    } catch (err) {
      console.error('Error updating agent status:', err);
      return { success: false, error: err.message };
    }
  },
};

module.exports = agentService;
