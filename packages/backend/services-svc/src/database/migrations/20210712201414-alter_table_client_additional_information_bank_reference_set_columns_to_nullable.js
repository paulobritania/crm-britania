'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_bank_reference', 'name', {
      type: Sequelize.STRING(70),
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_bank_reference', 'agency', {
      type: Sequelize.STRING(4),
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_bank_reference', 'account', {
      type: Sequelize.STRING(20),
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_bank_reference', 'phone', {
      type: Sequelize.STRING(11),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_bank_reference', 'name', {
      type: Sequelize.STRING(70),
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_bank_reference', 'agency', {
      type: Sequelize.STRING(4),
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_bank_reference', 'account', {
      type: Sequelize.STRING(20),
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_bank_reference', 'phone', {
      type: Sequelize.STRING(11),
      allowNull: false
    })
  }
};
