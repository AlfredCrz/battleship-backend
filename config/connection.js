const Sequelize = require('sequelize');
const Configure = require('./configure-connection.js');

const Connection = new Sequelize(Configure.DB,Configure.USER,Configure.PASS, {
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