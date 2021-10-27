'use strict';

const indexCompositeUserIdCode = {
  name: 'workflow_task_responses_workflowId_title',
  unique: true
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'workflow_task_responses',
      ['workflow_task_id', 'title'],
      indexCompositeUserIdCode
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('workflow_task_responses', indexCompositeUserIdCode.name)
  }
};
