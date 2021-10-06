'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update_address', 'zip_code', {
      type: Sequelize.STRING(10),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update_address', 'zip_code', {
      type: Sequelize.STRING(10),
      allowNull: false
    })
  }
};
