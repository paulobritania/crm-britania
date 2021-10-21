'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_fan_documents',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      workflow_fan_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      file_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_fan_documents')
  }
};
