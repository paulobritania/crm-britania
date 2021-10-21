'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_representative_registration_performed', {
      fields: ['performed_id'],
      type: 'foreign key',
      name: 'fk_workflowRepresentativeRegistrationPerformed_workflowsPerformed',
      references: {
        table: 'workflows_performed',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_representative_registration_performed', 'fk_workflowRepresentativeRegistrationPerformed_workflowsPerformed')
  }
};
