import { Sequelize } from 'sequelize';
import { dbConfig } from './dbConfig.js';

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port || 3306,
    dialect: dbConfig.dialect,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      charset: 'utf8mb4',
    },
    timezone: '+00:00',
    define: {
      timestamps: true,
      freezeTableName: true,
    },
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Development DB connection established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to development database:', err);
  });

export default sequelize;