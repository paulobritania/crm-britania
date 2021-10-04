'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_performed_responses', {
      fields: ['workflow_task_response_id'],
      type: 'foreign key',
      name: 'fk_workflow_performed_responses_workflow_task_responses',
      references: {
        table: 'workflow_task_responses',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_performed_responses', 'fk_workflow_performed_responses_workflow_task_responses')
  }
};
