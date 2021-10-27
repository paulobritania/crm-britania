'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_document', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      social_contract_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      registration_form_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      invoices_from_other_suppliers_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      billing_ratio_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      current_balance_sheet_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lp_income_tax_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fp_income_tax_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      defis_dasn_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      pgdas_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      holder_document_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      holder_driver_license_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      residence_proof_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      special_regime_letter_st_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      letter_of_taxation_regime_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      generic_consultation_mato_grosso_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      national_simple_consultation_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      generic_consultation_mato_grosso_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_document')
  }
};
