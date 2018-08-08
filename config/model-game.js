const Sequelize = require('sequelize');
const sequelize = require('./configure.js')

let Game = sequelize.define('Game', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    playerIdOne: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'playerIdOne'
    },
    playerIdTwo: {
        type: Sequelize.STRING,
        field: 'playerIdTwo'
    },
    token: {
    	type: Sequelize.STRING,
        allowNull: false,
    	field: 'token'
    }
}, {
    freezeTableName: true
});
 
module.exports = Game;
