"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("representative_financial", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      client_group_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      short_name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      matrix: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      historic: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      carrier: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      bank_instructions: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      standard_income_instructions: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      receives_nfe: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      issue_bank_slip: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      generates_debit_notice: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      calculates_fine: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      receives_sci_information: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      simple_client: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      icms_taxpayer: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      buys_philco: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      full_non_cumulative: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("representative_financial");
  },
};
