'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users ', 'substitute_user_end_date', {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users ', 'substitute_user_end_date')
  }
};


