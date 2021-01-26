//esse arquivo tem como resposabilidade cadastrar as rotas a aplicação

const express = require("express");

const routes = express.Router();

const usuarioController = require("./controllers/usuario");
const postagemController = require("./controllers/postagem");
const sessaoController = require("./controllers/sessao");
const autorizacaoMid = require('./middlewares/autorizacao');

routes.post("/sessao",sessaoController.store);
routes.post("/usuario", usuarioController.store);

routes.use(autorizacaoMid);


routes.get("/usuario",usuarioController.listar);
routes.get("/usuario/:id",usuarioController.buscarPorId);

routes.post("/postagens",postagemController.store);
routes.delete("/postagens/:id",postagemController.delete);
routes.get("/postagens",postagemController.index);

module.exports = routes;