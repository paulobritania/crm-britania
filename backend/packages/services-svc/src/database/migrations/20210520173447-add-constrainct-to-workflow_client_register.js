"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_client_register", {
      fields: ["client_price_list_id"],
      type: "foreign key",
      name: "workflow_client_register_price_list",
      references: {
        table: "client_price_list",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_client_register",
      "workflow_client_register_price_list"
    );
  },
};
