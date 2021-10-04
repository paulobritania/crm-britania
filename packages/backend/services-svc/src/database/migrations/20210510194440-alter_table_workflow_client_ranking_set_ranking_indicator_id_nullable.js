'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_rankings', 'client_ranking_indicator_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_rankings', 'client_ranking_indicator_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  }
};
