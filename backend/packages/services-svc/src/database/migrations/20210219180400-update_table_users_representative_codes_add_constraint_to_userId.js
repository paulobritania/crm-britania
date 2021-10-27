'use strict';

const constraint = {
  fields: ['user_id'],
  type: 'foreign key',
  name: 'fk_users_representative_codes_to_users',
  references: {
    table: 'users',
    field: 'id'
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users_representative_codes', constraint)
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users_representative_codes', constraint.name)
  }
};
