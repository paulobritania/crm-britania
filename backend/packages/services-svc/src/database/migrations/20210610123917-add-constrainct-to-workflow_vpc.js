"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_vpc", {
      fields: ["status_id"],
      type: "foreign key",
      name: "workflow_vpc-status",
      references: {
        table: "workflow_vpc_status",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_vpc",
      "workflow_vpc_status"
    );
  },
};
