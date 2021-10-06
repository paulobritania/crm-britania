'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_types_access', {
      fields: ['access_id'],
      type: 'foreign key',
      name: 'fk_workflowTypesAccess_accesses',
      references: {
        table: 'accesses',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_types_access', 'fk_workflowTypesAccess_accesses')
  }
};
