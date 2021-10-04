"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_fan", {
      fields: ["workflow_performed_id"],
      type: "foreign key",
      name: "workflow_fan_performed",
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
      "workflow_fan",
      "workflow_fan_performed"
    );
  },
};
