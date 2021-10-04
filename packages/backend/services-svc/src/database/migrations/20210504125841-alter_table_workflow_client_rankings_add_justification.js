'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_client_rankings ', 'justification', {
      type: Sequelize.STRING(100),
      allowNull: false
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('workflow_client_rankings ', 'justification')
  }
};
