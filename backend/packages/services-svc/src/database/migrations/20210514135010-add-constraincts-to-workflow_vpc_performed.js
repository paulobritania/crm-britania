'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_vpc_performed", {
      fields: ["workflow_vpc_id"],
      type: "foreign key",
      name: "workflow_vpc_perfomerd_vpc",
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
      "workflow_vpc_performed",
      "workflow_vpc_perfomerd_vpc"
    );
  }
};
