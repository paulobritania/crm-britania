'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('companies', {
      fields: ['updated_by'],
      type: 'foreign key',
      name: 'fk_companies_updatedBy_to_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('companies', 'fk_companies_updatedBy_to_users')
  }
};
