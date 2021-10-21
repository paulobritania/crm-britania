'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('fields', {
      fields: ['access_id'],
      type: 'foreign key',
      name: 'fk_fields_accesses',
      references: {
        table: 'accesses',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('fields', 'fk_fields_accesses')
  }
};
