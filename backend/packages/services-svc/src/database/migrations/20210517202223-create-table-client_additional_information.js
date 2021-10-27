'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_additional_information', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      initial_contact: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      numbers_of_employes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      suggested_limit: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      share_capital: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      observation: {
        type: Sequelize.STRING('MAX')
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_additional_information')
  }
};
