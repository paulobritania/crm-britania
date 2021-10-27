'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_tasks ', 'hierarchy_level', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('workflow_tasks ', 'hierarchy_level')
  }
};
