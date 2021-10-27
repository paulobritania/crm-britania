'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_fiscal_parametrization', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      do_not_retain_icms: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      icms_substitute: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      icms_taxpayer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      opting_suspensions_ipi: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      buys_philco: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      withhold_tax: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      retention_agent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      full_non_acumulative: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_fiscal_parametrization')
  }
};
