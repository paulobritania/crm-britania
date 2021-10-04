'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ranking_indicators', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      alias: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ranking_indicators');
  }
};
