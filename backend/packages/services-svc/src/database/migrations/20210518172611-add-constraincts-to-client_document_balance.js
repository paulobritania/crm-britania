'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("client_document_balance", {
      fields: ["file_id"],
      type: "foreign key",
      name: "client_document_balance_file",
      references: {
        table: "files",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint(
      "client_document_balance",
      "client_document_balance_file"
    )
  }
};
