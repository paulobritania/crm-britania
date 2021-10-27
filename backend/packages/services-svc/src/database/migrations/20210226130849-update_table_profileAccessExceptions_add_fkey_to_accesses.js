'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('profile_access_exceptions', {
      fields: ['access_id'],
      type: 'foreign key',
      name: 'fk_profileAccessException_accesses',
      references: {
        table: 'accesses',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('profile_access_exceptions', 'fk_profileAccessException_accesses')
  }
};
