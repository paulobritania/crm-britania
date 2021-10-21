'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_additional_information_bank_reference', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      agency: {
        type: Sequelize.STRING(4),
        allowNull: false
      },
      account: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      client_additional_information_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_additional_information_bank_reference')
  }
};
