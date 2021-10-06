"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_performed_fan", {
      fields: ["workflow_performed_id"],
      type: "foreign key",
      name: "workflow_fan_performed_performeds",
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
      "workflow_fan_performed",
      "workflow_fan_performed_performeds"
    );
  },
};
