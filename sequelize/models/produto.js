const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../database')

const Produto = sequelize.define('produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Produto



const Pedido = require('./pedido')
Produto.belongsToMany(Pedido, { through: 'ProdutoPedido' })