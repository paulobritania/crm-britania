'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_fan', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('workflow_fan', 'active')
  }
};
