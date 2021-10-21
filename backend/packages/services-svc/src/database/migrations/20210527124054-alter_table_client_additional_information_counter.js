'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('client_additional_information_counter', 'description')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('client_additional_information_counter', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    })
  }
};
