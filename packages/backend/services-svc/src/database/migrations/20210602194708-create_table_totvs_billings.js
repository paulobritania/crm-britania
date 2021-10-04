'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('totvs_billings', {
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
      value_net: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      value_ipi: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      value_icms: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      value_pis_cofins: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      expenses: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('totvs_billings')
  }
};
