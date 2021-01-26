const {Model, DataTypes} = require('sequelize');

class Postagem  extends Model{
    static init(sequelize){
        super.init(   
            {
            nomesite: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            },
            {
                sequelize,
                tableName:"postagens"
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: "created_usuario_id"})
    }
}
module.exports = Postagem;