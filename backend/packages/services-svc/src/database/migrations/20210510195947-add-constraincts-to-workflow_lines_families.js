'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_vpc_lines_families", {
      fields: ["workflow_vpc_id"],
      type: "foreign key",
      name: "workflow_lines_families_vpc",
      references: {
        table: "workflow_vpc",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "workflow_vpc_lines_families",
      "workflow_lines_families_vpc"
    );
  },
};
