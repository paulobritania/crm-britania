'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_fan_families', 'code', {
      type: Sequelize.STRING(70),
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_fan_families', 'code', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  }
};
