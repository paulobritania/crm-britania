'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_tasks', {
      fields: ['profile_id'],
      type: 'foreign key',
      name: 'fk_workflow_tasks_to_profiles',
      references: {
        table: 'profiles',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_tasks', 'fk_workflow_tasks_to_profiles')
  }
};
