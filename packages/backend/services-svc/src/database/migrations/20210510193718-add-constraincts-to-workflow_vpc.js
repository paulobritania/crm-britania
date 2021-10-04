'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("workflow_vpc", {
      fields: ["created_by"],
      type: "foreign key",
      name: "workflow_vpc_created_users",
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
      "workflow_vpc_created_users"
    );
  },
};
