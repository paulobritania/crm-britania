'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('sticky_notes', {
      fields: ['updated_by'],
      type: 'foreign key',
      name: 'fk_stickyNotes_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('sticky_notes', 'fk_stickyNotes_users')
  }
};
