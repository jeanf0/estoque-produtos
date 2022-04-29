const models = require('../../sequelize/models')

const produtoRoute = async (app) => {
    app.route('/produtos/:id?')
        .get(async (req, res) => {
            const id = req.params.id

            if(id) {
                const produto = await models.produto.findOne({
                    where: {
                        id: id
                    }
                })
                
                if(produto == null) {
                    return res.status(400).send("Produto ID não existe.")
                }

                return res.send({ produto })
            }

            const produtos = await models.produto.findAll()

            return res.send({ produtos })
        })
        .post(async (req, res) => {
            const produto = req.body

            if(!produto.nome) {
                return res.status(400).send("Falha ao criar o produto. É necessário adicionar o nome.")
            }

            if(!produto.quantidade || produto.quantidade == null) {
                return res.status(400).send("Falha ao criar o produto. É necessário informar a quantidade.")
            }

            try {
                await models.produto.create(produto)

                return res.status(201).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao criar o produto. ")
            }
        })
        .put(async (req, res) => {
            const id = req.params.id

            if(!id) {
                return res.status(400).send("Produto ID está faltando.")
            }

            try {
                const produto = req.body

                await models.produto.update(produto, {
                    where: {
                        id: id
                    }
                })

                return res.status(200).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao atualizar produto")
            }
        })
        .delete(async (req, res) => {
            const id = req.params.id

            if(!id) {
                return res.status(400).send("Produto ID está faltando.")
            }

            const produto = await models.produto.findOne({
                where: {
                    id: id
                }
            })

            if(produto == null) {
                return res.status(400).send("Produto ID não existe.")
            }

            try {
                await models.produto.destroy({
                    where: {
                        id: id
                    }
                })

                return res.status(200).send("OK")
            } catch (error) {
                return res.status(400).send("Falha ao deletar produto.", error)
            }
        })
}

module.exports = produtoRoute