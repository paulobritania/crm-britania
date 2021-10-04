'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_additional_information_revenues', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false        
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false        
      },
      value: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false        
      },
      client_additional_information_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_additional_information_revenues')
  }
};
