"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('representative_commission_percentage', {
      fields: ['workflow_representative_registration_id'],
      type: 'foreign key',
      name: 'fk_representativeCommissionPercentage_to_workflowRepresentativeRegistration',
      references: {
        table: 'workflow_representative_registration',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('representative_commission_percentage', 'fk_representativeCommissionPercentage_to_workflowRepresentativeRegistration')
  }
};
