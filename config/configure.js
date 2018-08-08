const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbBattleship', 'sa', 'a301193MC', {
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

sequelize.authenticate()
	.then(() => {
	console.log('Connection has been established successfully.');
	})
	.catch(err => {
	console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;