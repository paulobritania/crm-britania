'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflows_performed', {
      fields: ['workflow_id'],
      type: 'foreign key',
      name: 'fk_workflows_performed_workflows',
      references: {
        table: 'workflows',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflows_performed', 'fk_workflows_performed_workflows')
  }
};
