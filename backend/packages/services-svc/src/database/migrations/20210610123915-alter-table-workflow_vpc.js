'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_vpc', 'status_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('workflow_vpc', 'status_id')
  }
};
