'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_client_update_address', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      zip_code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      public_place: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      district: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      complement: {
        allowNull: true,
        type: Sequelize.STRING(70)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(2)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING(11)
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(40)
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_client_update_address');
  }
};
