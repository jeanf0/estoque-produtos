const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../database')

const Cliente = sequelize.define('cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        }
    }
})

module.exports = Cliente

const Pedido = require('./pedido')
Cliente.hasMany(Pedido, {
    foreignKey: 'ClienteId'
})