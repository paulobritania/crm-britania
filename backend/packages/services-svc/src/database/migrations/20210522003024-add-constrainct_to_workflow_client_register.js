"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_client_register", {
      fields: ["workflow_performed_id"],
      type: "foreign key",
      name: "workflow_client_register_performed",
      references: {
        table: "workflows_performed",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_client_register",
      "workflow_client_register_performed"
    );
  },
};
