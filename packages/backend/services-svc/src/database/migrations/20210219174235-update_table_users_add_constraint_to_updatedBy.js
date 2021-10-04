'use strict';

const constraint = {
  fields: ['updated_by'],
  type: 'foreign key',
  name: 'fk_users_using_updatedBy',
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
