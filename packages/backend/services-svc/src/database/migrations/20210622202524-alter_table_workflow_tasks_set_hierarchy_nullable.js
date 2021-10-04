'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_tasks', 'allow_approver_from_hierarchy', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_tasks', 'allow_approver_from_hierarchy', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
  }
};
