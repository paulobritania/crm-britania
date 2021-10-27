'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflows', {
      fields: ['updated_by'],
      type: 'foreign key',
      name: 'fk_workflows_to_users_updated_by',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflows', 'fk_workflows_to_users_updated_by')
  }
};
