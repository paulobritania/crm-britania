'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ranking_indicator_values', {
      ranking_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ranking_indicator_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      symbol: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      goal: {
        type: Sequelize.DECIMAL(8, 3),
        allowNull: false
      },
      weight: {
        type: Sequelize.DECIMAL(8, 3),
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ranking_indicator_values');
  }
};
