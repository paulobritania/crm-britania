"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_performed_fan", {
      fields: ["workflow_fan_id"],
      type: "foreign key",
      name: "workflow_fan_performed_fan",
      references: {
        table: "workflow_fan",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_fan_performed",
      "workflow_fan_performed_fan"
    );
  },
};
