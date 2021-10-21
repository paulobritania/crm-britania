'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_fan', 'is_additive', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('workflow_fan', 'is_additive')
  }
};
