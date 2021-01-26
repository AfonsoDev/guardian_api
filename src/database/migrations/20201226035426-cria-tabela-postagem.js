'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("postagens",{
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nomesite: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      senha:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      created_usuario_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"usuarios",
          key: "id"
        },
        onUptade: "CASCADE",
        onDelete: "CASCADE"
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull:false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false,
      },
  });
},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("postagens");
  }
};
