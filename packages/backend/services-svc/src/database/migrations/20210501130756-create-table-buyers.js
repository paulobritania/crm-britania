"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("buyers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      voltage: {
        type: Sequelize.ENUM(["110", "220"]),
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      birthday: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      telephone: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      client_totvs_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      client_totvs_description: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      parent_company_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      buyer_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("buyers");
  },
};
