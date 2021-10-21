'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('representative_financial', 'client_group_description', {
      type: Sequelize.STRING(100),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('representative_financial', 'client_group_description')
  }
};
