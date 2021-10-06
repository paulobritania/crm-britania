'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_cadastral_check', 'cadastral_check', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_cadastral_check', 'new_client', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_cadastral_check', 'cadastral_check', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_cadastral_check', 'new_client', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
  }
};
