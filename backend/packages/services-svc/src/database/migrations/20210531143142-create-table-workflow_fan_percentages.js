'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_fan_percentages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      percentage: {
        type: Sequelize.NUMERIC(8, 3),
        allowNull: false
      },
      determination_basis: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      budget_description: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      periodicity: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      discount: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      basis_of_calculation: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      slaughter_return: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      workflow_fan_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_fan_percentage_list')
  }
};
