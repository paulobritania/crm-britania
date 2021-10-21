'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_vpc_performed", {
      fields: ["workflow_performed_id"],
      type: "foreign key",
      name: "workflow_vpc_performed_performed",
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
      "workflow_vpc_performed",
      "workflow_vpc_performed_performed"
    );
  }
};
