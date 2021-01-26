const Usuario = require("../models/Usuario");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const segredo = require('../config/auth.json')
module.exports = {
    async store(req, res){
        const {email, senha } =  req.body;

        const usuario = await Usuario.findOne({
            where:{
                email,
            },
        });
        if(!usuario || !await bycrypt.compare(senha, usuario.senha)){
            return res.status(403).send({erro: "Usuario ou e senha invalidos"})
        }
        const token = jwt.sign({usuarioId: usuario.id}, segredo.secret);
        res.status(201).send({
            usuario:{
                usuarioId: usuario.id, 
                usuarioNome: usuario.nome,
            },
            
            token
        });
    },

};