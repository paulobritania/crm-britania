'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_client_update', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'fk_workflow_client_update_users_created',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },
  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_client_update', 'fk_workflow_client_update_users_created')
  }
};
