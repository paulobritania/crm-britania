'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('settings', {
      fields: ['file_id'],
      type: 'foreign key',
      name: 'fk_settings_files',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('settings', 'fk_settings_files')
  }
};
