"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("representative_maintenance", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      representative_type: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      person_type: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      representative_group_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      representative_group_name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      payment_calendar: {
        type: Sequelize.Sequelize.DATE,
        allowNull: true,
      },
      formula: {
        type: Sequelize.STRING(12),
        allowNull: true
      },
      intermediator: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      generation_ad_carrier: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      commission_percentage: {
        type: Sequelize.DECIMAL(8, 3),
        allowNull: true
      },
      commission_emission_percentage: {
        type: Sequelize.DECIMAL(8, 3),
        allowNull: true
      },
      minimum_commission_percentage: {
        type: Sequelize.DECIMAL(8, 3),
        allowNull: true
      },
      maximum_commission_percentage: {
        type: Sequelize.DECIMAL(8, 3),
        allowNull: true
      },
      manual_commission: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("representative_maintenance");
  },
};
