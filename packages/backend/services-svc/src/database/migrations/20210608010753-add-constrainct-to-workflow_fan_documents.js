'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_fan_documents", {
      fields: ["file_id"],
      type: "foreign key",
      name: "workflow_fan_documents_file",
      references: {
        table: "files",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_fan_documents",
      "workflow_fan_documents_file"
    );
  },
};
