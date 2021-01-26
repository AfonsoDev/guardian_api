const Postagem = require('../models/Postagem');
const Usuario = require('../models/Usuario');

module.exports = {
    async index(req, res){
        const postagens = await Postagem.findAll({
            include:{
                association: "Usuario",
                attributes: ["id", "email", "nome"]
            },   
            order: [["created_At", "DESC"]],
        });
        res.send(postagens);
    },
    async store (req, res){
        const created_usuario_id = req.usuarioId;

        const {nomesite, email, senha } = req.body;

        
       
        try {
            const usuario = await Usuario.findByPk(created_usuario_id);
            if(!usuario){
                res.status(404).send({erro:"Usuario não existe"})
            }
            let postagem = await  usuario.createPostagem({nomesite, email, senha})

            //let post = await Postagem.create({nomesite, email, senha, created_usuario_id });
            
            res.status(201).send(postagem);

       } catch (error) {
           return res.status(500).send({erro:"Não foi possivel adicionar  postagem tenta mais tarde"})
       }
    },
    async delete(req,res){
        const created_usuario_id = req.usuarioId;
        
        const { id } = req.params;

        let postagem = await  Postagem.findByPk(id);

        if(!postagem){
            return res.status(404).send({erro: "Postagem não encontrada!"})
        }

        if(postagem.created_usuario_id != created_usuario_id){
            return res.status(401).send({erro: "Você não tem permissão para excluir essa postagem"})
        }

        await postagem.destroy();
        res.status(204).send()
    }
}