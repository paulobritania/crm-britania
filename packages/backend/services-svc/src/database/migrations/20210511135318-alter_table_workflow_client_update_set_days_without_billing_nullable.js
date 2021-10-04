'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'days_without_billing', {
      allowNull: true,
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'days_without_billing', {
      allowNull: false,
      type: Sequelize.INTEGER
    })
  }
};
