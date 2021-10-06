'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('client_additional_information_counter', 'share_capital')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('client_additional_information_counter', 'share_capital', {
      type: Sequelize.STRING,
      allowNull: true
    })
  }
};
