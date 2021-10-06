'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_tasks', 'allow_approver_from_hierarchy', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('workflow_tasks', 'allow_approver_from_hierarchy')
  }
};
