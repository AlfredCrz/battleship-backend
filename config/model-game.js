const Sequelize = require('sequelize');
const connection = require('./connection.js')

let Game = connection.define('Game', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    boardId: {
        type: Sequelize.INTEGER,
        field: 'boardId',
        allowNull: false,
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
