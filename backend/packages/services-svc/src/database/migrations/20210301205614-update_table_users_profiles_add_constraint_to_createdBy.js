'use strict';

const constraint = {
  fields: ['created_by'],
  type: 'foreign key',
  name: 'fk_users_profiles_createdBy',
  references: {
    table: 'users',
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
