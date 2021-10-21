'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('client_rankings', {
      fields: ['client_ranking_indicator_id'],
      type: 'foreign key',
      name: 'fk_client_rankings_client_ranking_indicators',
      references: {
        table: 'client_ranking_indicators',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('client_rankings', 'fk_client_rankings_client_ranking_indicators')
  }
};
