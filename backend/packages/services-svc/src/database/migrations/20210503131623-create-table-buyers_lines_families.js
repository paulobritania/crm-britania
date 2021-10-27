"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("buyers_lines_families", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      family_code: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      family_description: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      line_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      line_description: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("buyers_lines_families");
  },
};
