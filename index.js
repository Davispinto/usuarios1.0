const http = require("http");
const fs = require("fs");
const url = require("url");
const { guardarUsuario, logearUsuario, getUsuarios } = require("./consultas");

//base de datos y tabla
// create database softlife;
// \c softlife;

// create table usuarios (
//     email varchar(25), 
//     password varchar(25)
// );

//SERVIDOR BASE
http.createServer(async (req, res) => {
    if (req.url == "/" && req.method == "GET") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end()
            } else {
                res.setHeader("Content-Type", "Text/Html")
                res.end(data)
            }
        })
    };
    //crea
    if (req.url == "/usuario" && req.method == "POST") {
        let body;
        req.on("data", (chunk) => {
            body = chunk.toString();
        });
        req.on("end", async () => {
            const usuario = JSON.parse(body);
            try {
                const result = await guardarUsuario(usuario);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (e) {
                res.statusCode = 500;
                res.end("dramas con el servidor" + e);
            }
        });
    };

    //logea   
    if (req.url == "/login" && req.method == "POST") {
        let body;
        req.on("data", (chunk) => {
            body = chunk.toString();
        });
        req.on("end", async () => {
            try {
                const usuario = Object.values(JSON.parse(body));
                const result = await logearUsuario(usuario);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (err) {
                res.statusCode = 500;
                res.end("dramas con el servidor" + e);
            }
        })
    }

    //lee
    if (req.url == "/usuarios" && req.method == "GET") {
        try {
            const usuarios = await getUsuarios();
            res.end(JSON.stringify(usuarios));
        } catch (e) {
            res.statusCode = 500;
            res.end("ocurrio un problema con el servidor" + e);
        }
    };

}).listen(3000, console.log("server 3000 on"));