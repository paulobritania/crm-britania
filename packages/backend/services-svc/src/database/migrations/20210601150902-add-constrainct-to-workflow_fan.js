"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_fan", {
      fields: ["updated_by"],
      type: "foreign key",
      name: "workflow_fan_updated_users",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_fan",
      "workflow_fan_updated_users"
    );
  },
};
