'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_representative_registration', {
      fields: ['workflow_performed_id'],
      type: 'foreign key',
      name: 'fk_workflow_representative_registration_to_workflows_performed_id',
      references: {
        table: 'workflows_performed',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_representative_registration', 'fk_workflow_representative_registration_to_workflows_performed_id')
  }
};
