'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("client_document_pre", {
      fields: ["file_id"],
      type: "foreign key",
      name: "client_document_pre_file",
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
      "client_document_pre",
      "client_document_pre_file"
    )
  }
};
