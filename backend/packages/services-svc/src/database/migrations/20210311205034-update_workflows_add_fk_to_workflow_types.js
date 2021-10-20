'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflows', {
      fields: ['type_id'],
      type: 'foreign key',
      name: 'fk_workflows_to_workflowTypes_type_id',
      references: {
        table: 'workflow_types',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflows', 'fk_workflows_to_workflowTypes_type_id')
  }
};
