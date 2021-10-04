'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('profile_access_exceptions', {
      fields: ['permission_id'],
      type: 'foreign key',
      name: 'fk_profileAccessException_permissions',
      references: {
        table: 'permissions',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('profile_access_exceptions', 'fk_profileAccessException_permissions')
  }
};
