'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_client_update', {
      fields: ['billing_address_id'],
      type: 'foreign key',
      name: 'fk_workflow_client_update_workflow_client_update_address_billing',
      references: {
        table: 'workflow_client_update_address',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_client_update', 'fk_workflow_client_update_workflow_client_update_address_billing')
  }
};
