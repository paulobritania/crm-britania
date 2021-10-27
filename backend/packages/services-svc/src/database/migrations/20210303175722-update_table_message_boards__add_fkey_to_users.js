'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('message_boards', {
      fields: ['updated_by'],
      type: 'foreign key',
      name: 'fk_messageBoards_updatedBy_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('message_boards', 'fk_messageBoards_updatedBy_users')
  }
};
