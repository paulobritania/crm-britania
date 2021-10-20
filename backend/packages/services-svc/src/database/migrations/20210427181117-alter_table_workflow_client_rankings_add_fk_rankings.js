'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('workflow_client_rankings', {
      fields: ['ranking_id'],
      type: 'foreign key',
      name: 'fk_workflow_client_rankings_rankings',
      references: {
        table: 'rankings',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('workflow_client_rankings', 'fk_workflow_client_rankings_rankings')
  }
};
