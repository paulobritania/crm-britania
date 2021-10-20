'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.addConstraint("client_document", {
          fields: ["social_contract_file_id"],
          type: "foreign key",
          name: "client_document_social_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["registration_form_file_id"],
          type: "foreign key",
          name: "client_document_registration_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["invoices_from_other_suppliers_file_id"],
          type: "foreign key",
          name: "client_document_invoices_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["billing_ratio_file_id"],
          type: "foreign key",
          name: "client_document_billing_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["current_balance_sheet_file_id"],
          type: "foreign key",
          name: "client_document_balance_sheet_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["lp_income_tax_file_id"],
          type: "foreign key",
          name: "client_document_lp_income_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["fp_income_tax_file_id"],
          type: "foreign key",
          name: "client_document_fp_income_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["defis_dasn_file_id"],
          type: "foreign key",
          name: "client_document_defis_dasn_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["pgdas_file_id"],
          type: "foreign key",
          name: "client_document_pgdas_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["holder_document_file_id"],
          type: "foreign key",
          name: "client_document_holder_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["holder_driver_license_file_id"],
          type: "foreign key",
          name: "client_document_holder_driver_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["residence_proof_file_id"],
          type: "foreign key",
          name: "client_document_residence_proof_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["special_regime_letter_st_file_id"],
          type: "foreign key",
          name: "client_document_regime_letter_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["letter_of_taxation_regime_file_id"],
          type: "foreign key",
          name: "client_document_letter_of_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["generic_consultation_mato_grosso_file_id"],
          type: "foreign key",
          name: "client_document_generic_mato_grosso_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }),
        queryInterface.addConstraint("client_document", {
          fields: ["national_simple_consultation_file_id"],
          type: "foreign key",
          name: "client_document_national_simple_file",
          references: {
            table: "files",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        }) 
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint(
        "client_document",
        "client_document_social_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_registration_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_invoices_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_billing_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_balance_sheet_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_lp_income_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_defis_dasn_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_holder_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_pgdas_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_residence_proof_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_holder_driver_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_regime_letter_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_generic_mato_grosso_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_national_simple_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_fp_income_file"
      ),
      queryInterface.removeConstraint(
        "client_document",
        "client_document_letter_of_file"
      ),
    ])
  }
};
