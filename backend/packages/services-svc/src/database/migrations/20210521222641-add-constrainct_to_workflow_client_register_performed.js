"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_register_client_performed", {
      fields: ["workflow_register_client_id"],
      type: "foreign key",
      name: "client_register_performed_register",
      references: {
        table: "workflow_client_register",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_register_client_performed",
      "client_register_performed_register"
    );
  },
};
