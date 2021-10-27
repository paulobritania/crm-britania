'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('representative_document', {
      fields: ['file_id'],
      type: 'foreign key',
      name: 'fk_representative_document_to_files',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('representative_document', 'fk_representative_document_to_files')
  }
};
