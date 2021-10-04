'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_fiscal_parametrization', 'do_not_retain_icms', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'icms_substitute', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'icms_taxpayer', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'opting_suspensions_ipi', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'buys_philco', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'withhold_tax', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'retention_agent', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'full_non_acumulative', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_fiscal_parametrization', 'do_not_retain_icms', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'icms_substitute', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'icms_taxpayer', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'opting_suspensions_ipi', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'buys_philco', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'withhold_tax', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'retention_agent', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_fiscal_parametrization', 'full_non_acumulative', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
  }
};
