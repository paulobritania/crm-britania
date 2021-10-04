'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("client_document_pre", {
      fields: ["client_document_id"],
      type: "foreign key",
      name: "client_document_pre_document",
      references: {
        table: "client_document",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint(
      "client_document_pre",
      "client_document_pre_document"
    )
  }
};
