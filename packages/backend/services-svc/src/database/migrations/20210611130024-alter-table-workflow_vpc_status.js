'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('workflow_vpc_status', 'updated_at')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_vpc_status', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false
    })
  }
};