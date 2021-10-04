'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_financial', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      issue_bank_slip: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      generates_debit_notice: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      calculates_fine: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      receives_nfe: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      simple_client: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      receives_sci_information: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      standard_income: {
        type: Sequelize.STRING(5),
        allowNull: true
      },
      carrier: {
        type: Sequelize.STRING(8),
        allowNull: true
      },
      bank_instruction: {
        type: Sequelize.STRING(5),
        allowNull: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_financial')
  }
};
