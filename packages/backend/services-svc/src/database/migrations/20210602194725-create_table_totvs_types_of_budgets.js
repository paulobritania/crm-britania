'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('totvs_types_of_budgets', {
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
      direction_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      direction_desc: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      manager_regional_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      manager_regional_desc: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      manager_account_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      manager_account_desc: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      client_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      client_desc: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      line_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      line_desc: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      value_credit: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      value_devolution: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      money_consumed: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      type_of_budget: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('totvs_types_of_budgets')
  }
};
