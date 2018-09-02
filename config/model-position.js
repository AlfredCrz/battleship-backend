const Sequelize = require('sequelize');
const connection = require('./connection.js')

let Position = connection.define('Position', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    idPlayer: {
        type: Sequelize.STRING,
        field: 'idPlayer',
        allowNull: false,
    },
    idGame: {
        type: Sequelize.STRING,
        field: 'idGame',
        allowNull: false,
    },
    positionX: {
        type: Sequelize.INTEGER,
        field: 'positionX',
        allowNull: false,
    },
    positionY: {
        type: Sequelize.INTEGER,
        field: 'positionY',
        allowNull: false,
    },
    orientation: {
        type: Sequelize.STRING,
        field: 'orientation',
        allowNull: false,
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'type'
    }
}, {
    freezeTableName: true
});
 
module.exports = Position;