'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_histories', {
      workflow_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      updatedFields: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('workflow_histories');
  }
};
