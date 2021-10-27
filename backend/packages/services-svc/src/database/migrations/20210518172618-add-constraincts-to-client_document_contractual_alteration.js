'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("client_document_contractual_alteration", {
      fields: ["file_id"],
      type: "foreign key",
      name: "client_document_contractual_alteration_file",
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
      "client_document_contractual_alteration",
      "client_document_contractual_alteration_file"
    )
  }
};
