'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_ranking_indicators', {
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
      growth: {
        type: Sequelize.DECIMAL(8,3),
        allowNull: false
      },
      devolution: {
        type: Sequelize.DECIMAL(8,3),
        allowNull: false
      },
      product_introduction: {
        type: Sequelize.DECIMAL(8,3),
        allowNull: false
      },
      payment_terms: {
        type: Sequelize.DECIMAL(8,3),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_ranking_indicators');
  }
};
