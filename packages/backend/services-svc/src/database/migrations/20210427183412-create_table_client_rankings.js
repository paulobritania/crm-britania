'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_rankings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      client_totvs_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ranking_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      workflow_client_ranking_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      client_ranking_indicator_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_rankings');
  }
};
