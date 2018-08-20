const Sequelize = require('sequelize');
const Connection = new Sequelize('dbBattleship', 'sa', 'a301193MC', {
  host: 'localhost',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

module.exports = Connection;