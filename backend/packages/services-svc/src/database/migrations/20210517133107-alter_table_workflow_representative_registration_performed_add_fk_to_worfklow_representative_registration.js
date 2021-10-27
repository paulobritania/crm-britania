'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_representative_registration_performed', {
      fields: ['representative_registration_id'],
      type: 'foreign key',
      name: 'fk_workflowRepresentativeRegistrationPerformed_workflowRepresentativeRegistration',
      references: {
        table: 'workflow_representative_registration',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_representative_registration_performed', 'fk_workflowRepresentativeRegistrationPerformed_workflowRepresentativeRegistration')
  }
};
