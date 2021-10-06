"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("buyers_lines_families", {
      fields: ["buyer_id"],
      type: "foreign key",
      name: "buyers_lines_families_buyers",
      references: {
        table: "buyers",
        field: "id",
      },
      onDelete: "no action",
      onUpdate: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "buyers_lines_families",
      "buyers_lines_families_buyers"
    );
  },
};
