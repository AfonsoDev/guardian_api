const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Usuario = require("../models/Usuario");
const Postagem = require("../models/Postagem");

const conexao = new Sequelize(dbConfig.url, dbConfig.config); 

Usuario.init(conexao);
Postagem.init(conexao);

Usuario.associate(conexao.models);
Postagem.associate(conexao.models);


module.exports = conexao;