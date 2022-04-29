const sequelize = require('../database');

const models = {
    cliente: require('./cliente'),
    produto: require('./produto'),
    pedido: require('./pedido'),
    sequelize: sequelize
}

module.exports = models