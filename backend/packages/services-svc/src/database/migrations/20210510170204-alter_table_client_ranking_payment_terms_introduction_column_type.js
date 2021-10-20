'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('client_ranking_indicators', 'payment_terms', {
      type: Sequelize.DECIMAL(18,3),
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('client_ranking_indicators', 'payment_terms', {
      type: Sequelize.DECIMAL(8,3),
      allowNull: false
    })
  }
};
