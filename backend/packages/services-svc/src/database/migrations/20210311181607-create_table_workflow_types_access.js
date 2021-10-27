'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_types_access', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      access_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      workflow_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('workflow_types_access');
  }
};
