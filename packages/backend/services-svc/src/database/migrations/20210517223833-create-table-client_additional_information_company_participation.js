'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_additional_information_participation_company', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(70),
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
      branch: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      participation_percent: {
        type: Sequelize.NUMERIC(8, 3),
        allowNull: true
      },
      client_additional_information_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_additional_information_participation_company')
  }
};
