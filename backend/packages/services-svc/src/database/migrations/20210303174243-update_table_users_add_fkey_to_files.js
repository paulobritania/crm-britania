'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', {
      fields: ['image_id'],
      type: 'foreign key',
      name: 'fk_users_imageId_files',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('users', 'fk_users_imageId_files')
  }
};
