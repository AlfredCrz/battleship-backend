const Sequelize = require('sequelize');
const connection = require('./connection.js')

let Board = connection.define('Board', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    idPlayer: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'idPlayer',

    },
    rows: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'rows'
    },
    columns: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'columns'
    }
}, {
    freezeTableName: true
});
 
module.exports = Board;
