'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'logistics_information', {
        allowNull: true,
        type: Sequelize.STRING(40)
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'logistics_information', {
        allowNull: false,
        type: Sequelize.STRING(40)
      })
  }
};
