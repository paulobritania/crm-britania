"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("representative_bank_data", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      code: {
        type: Sequelize.STRING(4),
        allowNull: true
      },
      agency: {
        type: Sequelize.STRING(7),
        allowNull: true
      },
      account: {
        type: Sequelize.STRING(20),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("representative_bank_data");
  },
};
