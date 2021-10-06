'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_parametrization', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      client_group_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      short_name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      parent_company_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      parent_company: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      historic: {
        type: Sequelize.STRING('MAX'),
        allowNull: true
      },
      intermediary: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_parametrization')
  }
};
