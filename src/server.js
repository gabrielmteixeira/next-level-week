const express = require("express") // pegando a função express
const server = express()

// configurar pasta pública
server.use(express.static("public"))
// coloca as pastas dentro de public disponiveis na raiz do projeto


// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da aplicação:
// página inicial
// req: Requisição
// res: Resposta

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

// __dirname é uma variável que contém o caminho até o diretório atual

// ligar o servidor
server.listen(3000)
//fica ouvindo a porta 3000 / ligue o servidor na porta 3000