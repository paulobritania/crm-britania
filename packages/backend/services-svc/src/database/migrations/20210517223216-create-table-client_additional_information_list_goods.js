'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_additional_information_counter', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      counter: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      counter_phone: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
      counter_crc: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      share_capital: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      localization: {
        type: Sequelize.STRING(20),
        allowNull: true
      },  
      client_additional_information_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_additional_information_counter')
  }
};
