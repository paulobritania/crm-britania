"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("address", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      number: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      complement: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      district: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      cep: {
        type: Sequelize.STRING(8),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("address");
  },
};
