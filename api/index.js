const express = require('express')
const bodyParser = require('body-parser')

const clienteRoute = require('./routes/clienteRoute')
const produtoRoute = require('./routes/produtoRoute')
const pedidoRoute = require('./routes/pedidoRoute')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

clienteRoute(app)
produtoRoute(app)
pedidoRoute(app)

app.get('/', (req, res) => {
    res.send("<h1>Api funcionando<h1>")
})

app.listen(port, () => console.log('api rodando em http://localhost:3000'))