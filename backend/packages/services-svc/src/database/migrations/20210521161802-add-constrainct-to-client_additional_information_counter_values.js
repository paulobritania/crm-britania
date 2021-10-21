"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("client_additional_information_counter_values", {
      fields: ["client_additional_information_counter_id"],
      type: "foreign key",
      name: "counter_values",
      references: {
        table: "client_additional_information_counter",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "client_additional_information_counter_values",
      "counter_values"
    );
  },
};
