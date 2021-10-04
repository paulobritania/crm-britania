'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("client_document", {
      fields: ["syntactic_query_file_id"],
      type: "foreign key",
      name: "client_document_syntactic_query_file",
      references: {
        table: "files",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "client_document",
      "client_document_syntactic_query_file"
    )
  }
};
