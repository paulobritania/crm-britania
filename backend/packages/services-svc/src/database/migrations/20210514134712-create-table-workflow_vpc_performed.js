'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_vpc_performed', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      workflow_vpc_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      workflow_performed_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_vpc_performed')
  }
};
