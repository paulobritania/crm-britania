'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('profile_micros', {
      fields: ['field_id'],
      type: 'foreign key',
      name: 'fk_profileMicro_fields',
      references: {
        table: 'fields',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('profile_micros', 'fk_profileMicro_fields')
  }
};
