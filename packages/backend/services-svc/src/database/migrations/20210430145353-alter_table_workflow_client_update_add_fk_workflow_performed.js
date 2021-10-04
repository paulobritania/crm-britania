'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_client_update', {
      fields: ['workflow_performed_id'],
      type: 'foreign key',
      name: 'fk_workflow_client_update_workflows_performed',
      references: {
        table: 'workflows_performed',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },
  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_client_update', 'fk_workflow_client_update_workflows_performed')
  }
};
