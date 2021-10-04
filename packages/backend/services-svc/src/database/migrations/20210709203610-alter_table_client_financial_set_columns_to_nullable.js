'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_financial', 'issue_bank_slip', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_financial', 'generates_debit_notice', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_financial', 'calculates_fine', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_financial', 'receives_nfe', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_financial', 'simple_client', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_financial', 'receives_sci_information', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_financial', 'issue_bank_slip', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_financial', 'generates_debit_notice', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_financial', 'calculates_fine', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_financial', 'receives_nfe', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_financial', 'simple_client', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_financial', 'receives_sci_information', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
  }
};
