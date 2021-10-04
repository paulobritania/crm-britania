'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_client_register", {
      fields: ["client_parametrization_id"],
      type: "foreign key",
      name: "workflow_client_register_parametrization",
      references: {
        table: "client_parametrization",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint(
      "workflow_client_register",
      "workflow_client_register_parametrization"
    )
  }
};
