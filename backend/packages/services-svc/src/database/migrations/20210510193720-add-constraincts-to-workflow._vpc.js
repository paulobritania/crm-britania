'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_vpc", {
      fields: ["updated_by"],
      type: "foreign key",
      name: "workflow_vpc_updated_users",
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
      "workflow_vpc",
      "workflow_vpc_updated_users"
    );
  },
};
