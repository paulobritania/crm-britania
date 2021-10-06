'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_client_register', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      company_name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      cnpj: {
        type: Sequelize.STRING(14),
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
        type: Sequelize.STRING(11),
        allowNull: true
      },
      shopping_phone: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
      billing_email: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      invoice_shipping_email: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      business_email: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      site: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      public_place: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      complement: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      number: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      district: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: true
      },
      zip_code: {
        type: Sequelize.STRING(12),
        allowNull: true
      },
      parent_company_name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      parent_company_cnpj: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      client_additional_information_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_fiscal_information_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_registration_information_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_financial_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_cadastral_check_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_parametrization_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_price_list_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_fiscal_document_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_fiscal_parametrization_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      client_fiscal_parametrization_cfop_id: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('workflow_client_register')
  }
};
