'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_histories', {
      fields: ['workflow_id'],
      type: 'foreign key',
      name: 'fk_workflow_histories_to_workflows',
      references: {
        table: 'workflows',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_histories', 'fk_workflow_histories_to_workflows')
  }
};
