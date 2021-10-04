'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("buyers", {
      fields: ["created_by"],
      type: "foreign key",
      name: "fk_buyers_users_created",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint("buyers", "fk_buyers_users_created")
  }
};
