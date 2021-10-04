'use strict';

const constraint = {
  fields: ['substitute_user_id'],
  type: 'foreign key',
  name: 'fk_users_using_substituteUserId',
  references: {
    table: 'users',
    field: 'id'
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', constraint)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users', constraint.name)
  }
};
