const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../database')

const Pedido = sequelize.define('pedido', {
    
})

module.exports = Pedido

const Cliente = require('./cliente')
Pedido.belongsTo(Cliente, {
    foreignKey: 'ClienteId'
})

const Produto = require('./produto')
Pedido.belongsToMany(Produto, { through: 'ProdutoPedido' })