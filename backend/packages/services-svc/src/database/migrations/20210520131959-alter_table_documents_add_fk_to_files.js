"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('documents', {
      fields: ['file_id'],
      type: 'foreign key',
      name: 'fk_documents_to_files',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('documents', 'fk_documents_to_files')
  }
};
