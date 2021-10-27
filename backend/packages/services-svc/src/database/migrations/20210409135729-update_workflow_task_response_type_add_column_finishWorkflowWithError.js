'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_task_responses ', 'finish_workflow_with_error', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('workflow_task_responses ', 'finish_workflow_with_error')
  }
};


