'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users ', 'name')
  },

  down: async (queryInterface) => {
    return queryInterface.addColumn('users ', 'name', {
      type: Sequelize.STRING(50),
      allowNull: false
    })
  }
};
