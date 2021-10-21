'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_fan', 'directorship', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_fan', 'directorship', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  }
};
