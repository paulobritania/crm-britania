'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_task_conditions', {
      fields: ['workflow_task_id'],
      type: 'foreign key',
      name: 'fk_workflow_task_conditions_to_workflow_tasks',
      references: {
        table: 'workflow_tasks',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_task_conditions', 'fk_workflow_task_conditions_to_workflow_tasks')
  }
};
