'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_registration_information', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      representative_code: {
        type: Sequelize.INTEGER,
        allowNull: true 
      },
      representative_name: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_registration_information')
  }
};
