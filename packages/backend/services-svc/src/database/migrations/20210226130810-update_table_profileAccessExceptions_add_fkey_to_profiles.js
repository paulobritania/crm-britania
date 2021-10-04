'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('profile_access_exceptions', {
      fields: ['profile_id'],
      type: 'foreign key',
      name: 'fk_profileAccessException_profiles',
      references: {
        table: 'profiles',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('profile_access_exceptions', 'fk_profileAccessException_profiles')
  }
};
