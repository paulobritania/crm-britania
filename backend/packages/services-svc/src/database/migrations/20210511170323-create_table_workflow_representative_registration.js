"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("workflow_representative_registration", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company_name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false
      },
      contact_name: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      state_registration: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      suframa: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      commercial_phone: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
      billing_phone: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
      cellphone: {
        type: Sequelize.STRING(12),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      site: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      representative_bank_data_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      representative_financial_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      representative_maintenance_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      workflow_performed_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("workflow_representative_registration");
  },
};
