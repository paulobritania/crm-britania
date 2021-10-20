'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_representative_registration', {
      fields: ['representative_bank_data_id'],
      type: 'foreign key',
      name: 'fk_workflow_representative_registration_to_representative_bank_data_id',
      references: {
        table: 'representative_bank_data',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_representative_registration', 'fk_workflow_representative_registration_to_representative_bank_data_id')
  }
};
