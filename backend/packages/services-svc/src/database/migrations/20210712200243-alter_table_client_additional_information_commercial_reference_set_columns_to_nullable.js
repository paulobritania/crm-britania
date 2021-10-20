'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_commercial_reference', 'suframa', {
      type: Sequelize.STRING(14),
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_commercial_reference', 'name', {
      type: Sequelize.STRING(70),
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_commercial_reference', 'phone', {
      type: Sequelize.STRING(11),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_commercial_reference', 'suframa', {
      type: Sequelize.STRING(14),
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_commercial_reference', 'name', {
      type: Sequelize.STRING(70),
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_commercial_reference', 'phone', {
      type: Sequelize.STRING(11),
      allowNull: false
    })
  }
};
