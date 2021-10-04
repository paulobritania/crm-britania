"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("buyers", {
        fields: ["parent_company_address_id"],
        type: "foreign key",
        name: "fk_buyers_matrix_buyers_address",
        references: {
          table: "buyers_address",
          field: "id",
        },
        onDelete: "no action",
        onUpdate: "no action",
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
        "buyers",
        "fk_buyers_matrix_buyers_address"
      )
  },
};
