'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_vpc', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      parent_company_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      parent_company_name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      company_name: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      founds_type: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
      tranding_number: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      payment_type: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      request_number: {
        type: Sequelize.STRING(13),
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      deployment_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      value: {
        type: Sequelize.NUMERIC(14, 9),
        allowNull: true
      },
      campaign_reason: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      directorship: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      approver_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      approver_description: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      bank: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      bank_agency: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      bank_account: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      bank_cnpj: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      workflow_performed_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_vpc')
  }
};
