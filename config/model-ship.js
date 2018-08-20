const Sequelize = require('sequelize');
const connection = require('./connection.js')

let Ship = connection.define('Ship', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'quantity'
    }
}, {
    freezeTableName: true
});
 
module.exports = Ship;
