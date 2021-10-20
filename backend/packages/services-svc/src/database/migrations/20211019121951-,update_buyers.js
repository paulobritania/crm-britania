'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('buyers', 'client_totvs_description'),
      queryInterface.addColumn('buyers', 'image_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('buyers', 'client_totvs_description'),
      queryInterface.removeColumn('buyers', 'image_id')
    ])
  }
};
