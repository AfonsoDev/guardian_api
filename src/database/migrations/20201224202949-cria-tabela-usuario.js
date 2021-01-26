'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("usuarios",{
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      telefone:{
        type: Sequelize.STRING(15),
        allowNull:false,
        unique: true,
      },
      nome:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
      },
      senha:{
        type: Sequelize.STRING,
        allowNull:false,
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
    queryInterface.dropTable("usuarios");
  }
};
