'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('client_rankings', 'workflow_client_ranking_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('client_rankings', 'workflow_client_ranking_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  }
};
