'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ranking_indicator_values', {
      fields: ['ranking_id'],
      type: 'foreign key',
      name: 'fk_ranking_indicator_values_rankings',
      references: {
        table: 'rankings',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeConstraint('ranking_indicator_values', 'fk_ranking_indicator_values_rankings')
  }
};
