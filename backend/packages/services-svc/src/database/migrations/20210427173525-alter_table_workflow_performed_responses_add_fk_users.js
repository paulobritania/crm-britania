'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_performed_responses', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'fk_workflow_performed_responses_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_performed_responses', 'fk_workflow_performed_responses_users')
  }
};
