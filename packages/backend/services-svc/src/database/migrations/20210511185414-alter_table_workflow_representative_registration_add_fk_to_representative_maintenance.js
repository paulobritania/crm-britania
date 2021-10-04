'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_representative_registration', {
      fields: ['representative_maintenance_id'],
      type: 'foreign key',
      name: 'fk_workflow_representative_registration_to_representative_maintenance_id',
      references: {
        table: 'representative_maintenance',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_representative_registration', 'fk_workflow_representative_registration_to_representative_maintenance_id')
  }
};
