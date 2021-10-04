'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('buyers_address', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      street: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      uf: {
        type: Sequelize.STRING(2),
        allowNull: true
      },
      cep: {
        type: Sequelize.STRING(8),
        allowNull: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('buyers_address')
  }
};
