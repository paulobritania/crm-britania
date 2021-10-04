"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_client_register", {
      fields: ["client_additional_information_id"],
      type: "foreign key",
      name: "workflow_client_client_additional_information",
      references: {
        table: "client_additional_information",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_client_register",
      "workflow_client_client_additional_information"
    );
  },
};
