'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users ', 'integrated_ad')
  },

  down: async (queryInterface) => {
    return queryInterface.addColumn('users ', 'integrated_ad', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
  }
};
