const models = require('../../sequelize/models')

const clienteRoute = async (app) => {
    app.route('/clientes/:id?')
        .get(async (req, res) => {
            const id = req.params.id

            if(id) {
                const clientes = await models.cliente.findOne({
                    where: {id: id}
                })

                if(clientes != null) {
                    return res.status(400).send("Cliente ID não existe.")
                }
                
                return res.send({ clientes })
            }

            const clientes = await models.cliente.findAll()
            return res.send({ clientes })
        })
        .post(async (req, res) => {

            const cliente = req.body


            if(!cliente.nome) {
                return res.status(400).send("Falha ao criar o usuario. É necessário adicionar o nome")
            }

            if(!cliente.email) {
                return res.status(400).send("Falha ao criar o usuario. É necessário adicionar o email")
            }

            try {
                await models.cliente.create(cliente)
                return res.status(201).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao criar o usuario.")
            }
        })
        .put(async (req, res) => {
            const id = req.params.id

            if(!id) {
                return res.status(400).send("Cliente ID está faltando.")
            }

            const cliente = req.body

            try {
                await models.cliente.update(cliente, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao atualizar usuario")
            }
        })
        .delete(async (req, res) => {
            const id = req.params.id

            if(!id) {
                return res.status(400).send("Cliente ID está faltando")
            }

            const cliente = await models.cliente.findOne({
                where: {
                    id: id
                }
            })

            if(cliente == null) {
                return res.status(400).send("Cliente ID não existe")
            }

            try {
                await models.cliente.destroy({
                    where: {
                        id: id
                    }
                })

                return res.status(200).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao deletar usuário.")
            }
        })
}

module.exports = clienteRoute