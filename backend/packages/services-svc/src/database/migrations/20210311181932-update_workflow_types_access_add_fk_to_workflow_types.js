'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_types_access', {
      fields: ['workflow_type_id'],
      type: 'foreign key',
      name: 'fk_workflowTypesAccess_workflow_types',
      references: {
        table: 'workflow_types',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_types_access', 'fk_workflowTypesAccess_workflow_types')
  }
};
