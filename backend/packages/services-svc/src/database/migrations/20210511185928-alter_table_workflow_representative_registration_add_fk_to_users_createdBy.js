'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_representative_registration', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'fk_workflow_representative_registration_to_users_created_by',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_representative_registration', 'fk_workflow_representative_registration_to_users_created_by')
  }
};
