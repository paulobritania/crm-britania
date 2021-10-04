'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information ', 'share_capital', {
      type: Sequelize.DECIMAL(19,4),
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information ', 'suggested_limit', {
      type: Sequelize.DECIMAL(19,4),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information ', 'share_capital', {
      type: Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information ', 'suggested_limit', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  }
};


