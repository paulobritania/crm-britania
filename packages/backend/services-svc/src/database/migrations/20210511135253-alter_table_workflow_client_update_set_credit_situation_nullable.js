'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'credit_situation', {
        allowNull: true,
        type: Sequelize.STRING(40)
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'credit_situation', {
        allowNull: false,
        type: Sequelize.STRING(40)
      })
  }
};
