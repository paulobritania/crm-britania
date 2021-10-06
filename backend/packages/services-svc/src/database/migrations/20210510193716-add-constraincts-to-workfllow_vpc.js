'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_vpc", {
      fields: ["workflow_performed_id"],
      type: "foreign key",
      name: "workflow_vpc_workflow_performed",
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
      "workflow_vpc",
      "workflow_vpc_workflow_performed"
    );
  },
};
