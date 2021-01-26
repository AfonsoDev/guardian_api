const jwt = require("jsonwebtoken");
const segredo = require('../config/auth.json')
module.exports = (req,res,next )=> {

    const {authorization} = req.headers;

    if(!authorization){
        res.status(401).send({erro: "Token não existente, não tem permissão para isso"})
    }
    const [Bearer, token] = authorization.split(" ");

    if(!token){
        res.status(401).send({erro: "Token mal formatado"});
    }
    try {
        const retorno = jwt.verify(token, segredo.secret);

        req.usuarioId = retorno.usuarioId;
        return next();

    } catch (error) {
        res.status(401).send({erro: "Token invalido"});
    }
    return null;
}