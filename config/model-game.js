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
    playerOneId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'playerOneId'
    },
    playerTwoId: {
        type: Sequelize.STRING,
        field: 'playerTwoId'
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
