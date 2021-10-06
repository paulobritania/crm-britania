'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_fan_goal_achivements', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      start_percentage: {
        type: Sequelize.NUMERIC(8, 3),
        allowNull: true
      },
      end_percentage: {
        type: Sequelize.NUMERIC(8, 3),
        allowNull: true
      },
      bonus: {
        type: Sequelize.NUMERIC(8, 3),
        allowNull: true
      },
      basis_of_calculation: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      determination_basis: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      slaughter_return: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      periodicity: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      workflow_fan_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_fan_percentages')
  }
};
