const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

// Configuração pasta pública
server.use(express.static("public"))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configuração de rotas
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {

    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        // Mostrar a página HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows})
    })


})


// Ligar o servidor
server.listen(3000)