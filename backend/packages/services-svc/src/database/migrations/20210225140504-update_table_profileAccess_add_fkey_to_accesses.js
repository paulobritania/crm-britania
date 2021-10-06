'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('profile_access', {
      fields: ['access_id'],
      type: 'foreign key',
      name: 'fk_profileAccess_accesses',
      references: {
        table: 'accesses',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('profile_access', 'fk_profileAccess_accesses')
  }
};
