'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_cadastral_check', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cadastral_check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false 
      },
      new_client: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false 
      },
      risk_class: {
        type: Sequelize.STRING(1),
        allowNull: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_cadastral_check')
  }
};
