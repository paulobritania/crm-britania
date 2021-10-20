'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_fan_negotiated_funds', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.NUMERIC(8, 3),
        allowNull: true
      },
      description: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      periodicity: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      discount: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      determination_basis: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      basis_of_calculation: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      slaughter_return: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      workflow_fan_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_fan_funds_trated_list')
  }
};
