"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("client_additional_information_commercial_reference", {
      fields: ["client_additional_information_id"],
      type: "foreign key",
      name: "client_additional_commercial_reference_information",
      references: {
        table: "client_additional_information",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "client_additional_information_commercial_reference",
      "client_additional_commercial_reference_information"
    );
  },
};
