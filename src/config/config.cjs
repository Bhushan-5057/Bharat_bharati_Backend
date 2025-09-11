const { dbConfig } = require('./dbConfig.js');

module.exports = {
  development: {
    username: dbConfig.username || 'root',
    password: dbConfig.password || null,
    database: dbConfig.database || 'mydb',
    host: dbConfig.host || '127.0.0.1',
    port: dbConfig.port || 5432,
    dialect: dbConfig.dialect || 'mysql',
    timezone: '+00:00',
    dialectOptions: {
      charset: 'utf8mb4',
    }
  },
};
