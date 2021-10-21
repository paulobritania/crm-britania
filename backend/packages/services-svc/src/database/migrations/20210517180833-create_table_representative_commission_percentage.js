"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("representative_commission_percentage", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      workflow_representative_registration_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      establishment_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      establishment_description: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      line_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      line_description: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      commission_percentage: {
        type: Sequelize.DECIMAL(8, 3),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("representative_commission_percentage");
  },
};
