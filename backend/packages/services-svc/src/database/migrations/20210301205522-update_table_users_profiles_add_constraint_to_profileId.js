'use strict';

const constraint = {
  fields: ['profile_id'],
  type: 'foreign key',
  name: 'fk_users_profiles_profileId',
  references: {
    table: 'profiles',
    field: 'id'
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users_profiles', constraint)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users_profiles', constraint.name)
  }
};
