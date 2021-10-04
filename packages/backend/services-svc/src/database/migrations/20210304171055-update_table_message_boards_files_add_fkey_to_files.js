'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('message_boards_files', {
      fields: ['file_id'],
      type: 'foreign key',
      name: 'fk_message_boards_files_to_files',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('message_boards_files', 'fk_message_boards_files_to_files')
  }
};
