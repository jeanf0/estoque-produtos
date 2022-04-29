const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    host: 'localhost',
    database: 'estoque-produtos',
    username: 'postgres',
    password: '123456',
    dialect: 'postgres',
    port: 5432
})
// const sequelize = new Sequelize('postgres://estoque-produtos:123456@localhost:5432/postgres') 

module.exports = sequelize

async function test() {
    try {
        await sequelize.authenticate()
        console.log('Sequelize iniciou')
    } catch (error) {
        console.error("Houve um errro ao conectar com o banco")
        console.error(error)
        process.exit()
    }
}
// test()

const models = require('./models')

async function create(){
  await models.sequelize.sync({force: true})
  await models.sequelize.close()

  console.log("Banco sincronizado");
}
// create()
