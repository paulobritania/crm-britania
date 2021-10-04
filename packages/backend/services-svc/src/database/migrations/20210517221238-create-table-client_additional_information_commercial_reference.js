'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_additional_information_commercial_reference', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      suframa: {
        type: Sequelize.STRING(14),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(70),
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
    return queryInterface.dropTable('client_additional_information_commercial_reference')
  }
};
