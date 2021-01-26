const {Op} = require("sequelize")
const conexao = require('../database');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const segredo = require('../config/auth.json')


module.exports ={
   async listar(req, res){
        const usuario = await Usuario.findAll();
        res.send(usuario);

    },
    async buscarPorId(req, res){

        const {id} = req.params;

        const usuario = await Usuario.findByPk(id, {raw:true});

        console.log(usuario);

        if(!usuario){
            return res.status(404).send({error:"Uusario não encontrado"})
        }
        delete usuario.senha;
        res.send(usuario)
    },
    //Inserções
    async store(req, res){
        const {telefone, nome, email, senha} = req.body;
        console.log(email);
        
        let usuario = await Usuario.findOne({where:{[Op.or]: [{telefone:telefone},{email:email}]}});
        
        if(usuario){
            return res.status(400).send({error:"Usuario ja cadastrado"})
        }

        try {
            const senhaCrypto = await bcrypt.hash(senha,10);
            usuario = await Usuario.create({telefone, nome, email, senha: senhaCrypto});
        } catch (error) {
            console.log(error);
        }
        const token = jwt.sign({usuarioId: usuario.id}, segredo.secret)
        
        res.status(201).send({
            usuario:{
                usuarioId: usuario.id, 
                usuarioNome: usuario.nome,
            },
            
            token
        });
    },
    update(){

    },
    delete(){
        
    },

}