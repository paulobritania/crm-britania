'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_vpc_lines_families', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
      },
      line_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      line_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      family_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      family_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      workflow_vpc_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_vpc_lines_families')
  }
};
