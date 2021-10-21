'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_fan_lines_families', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      line_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      line_description: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      family_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      family_description: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      workflow_fan_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_fan_lines_families')
  }
};
