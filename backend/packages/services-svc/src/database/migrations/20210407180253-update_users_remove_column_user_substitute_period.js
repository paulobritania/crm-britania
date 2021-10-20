'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users ', 'substitute_user_period')
  },

  down: async (queryInterface) => {
    return queryInterface.addColumn('users ', 'substitute_user_period', {
      type: Sequelize.DATE,
      allowNull: true
    })
  }
};


