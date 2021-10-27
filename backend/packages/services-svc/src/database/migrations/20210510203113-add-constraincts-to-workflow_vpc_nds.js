'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_vpc_nds", {
      fields: ["workflow_vpc_id"],
      type: "foreign key",
      name: "workflow_nds_vpc",
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
      "workflow_vpc_nds",
      "workflow_nds_vpc"
    );
  },
};
