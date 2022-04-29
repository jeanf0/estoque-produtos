const models = require('../../sequelize/models')

const pedidoRoute = async (app) => {
    app.route('/pedidos/:id?')
        .get(async (req, res) => {
            const id = req.params.id

            if(id) {
                const pedidoId = await models.pedido.findOne({
                    where: {
                        id: id
                    }
                })

                if(pedidoId == null) {
                    return res.status(400).send("Pedido ID não existe")
                }

                    
                const pedido = await models.pedido.findOne({
                    where: {
                        id: id
                    }
                })

                return res.send({ pedido })
            }

            const pedidos = await models.pedido.findAll()
            return res.send({ pedidos })
        })
        .post(async (req, res) => {
            const clienteId = req.body.clienteId
            const produtos = req.body.produtosId
            const arrayProdutos = produtos.split(", ")



            if(!clienteId || clienteId == null) {
                return res.status(400).send("Cliente Id está faltando")
            }

            const cliente = await models.cliente.findOne({
                where: {
                    id: clienteId
                }
            })

            if(cliente == null) {
                return res.status(400).send("Cliente Id não existe")
            }

            try {
                const pedido = await cliente.createPedido()

                await pedido.setProdutos(arrayProdutos)

                return res.status(201).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao criar o produto.")
            }
        })
        .put(async (req, res) => {
            const id = req.params.id

            if(!id) {
                return res.status(400).send("Pedido ID está faltando.")
            }

            try {
                await models.pedido.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao atualizar Pedido")
            }
        })
        .delete(async (req, res) => {
            const id = req.params.id

            if(!id) {
                return res.status(400).send("Pedido ID está faltando.")
            }

            const pedido = await models.pedido.findOne({
                where: {
                    id: id
                }
            })

            if(pedido == null) {
                return res.status(400).send("Pedido ID não existe")
            }


            try {
                await models.pedido.destroy({
                    where: {
                        id: id
                    }
                })
                return res.status(200).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao deletar pedido.")
            }
        })
}

module.exports = pedidoRoute