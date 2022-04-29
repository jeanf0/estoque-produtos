const models = require('./models')

async function insert() {
    //criar cliente
    const jean = await models.cliente.create({nome: "Jean", email: "jean@email.com"})

    //criar produto
    const lapis = await models.produto.create({nome: "lapis", quantidade: 5})
    const caderno = await models.produto.create({nome: "caderno", quantidade: 5})
    
    //criar pedido
    // const pedidoJean = await models.pedido.create()
    console.log(jean.countPedidos());
    console.log("//");
    const pedidoJean = await jean.createPedido()
    console.log(jean.countPedidos());
    

    //inserir produtos
    await pedidoJean.setProdutos([lapis, caderno])

    console.log("Dados inseridos");

    
}
insert()