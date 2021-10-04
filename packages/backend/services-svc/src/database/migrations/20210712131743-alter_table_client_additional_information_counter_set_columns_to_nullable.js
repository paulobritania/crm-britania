'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_counter', 'counter', {
      type: Sequelize.STRING(70),
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_counter', 'counter_phone', {
      type: Sequelize.STRING(11),
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_counter', 'counter_crc', {
      type: Sequelize.STRING(10),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_counter', 'counter', {
      type: Sequelize.STRING(70),
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_counter', 'counter_phone', {
      type: Sequelize.STRING(11),
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_counter', 'counter_crc', {
      type: Sequelize.STRING(10),
      allowNull: false
    })
  }
};
