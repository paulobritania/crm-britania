'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('logs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      new_data: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      old_data: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      table: {
        type: Sequelize.STRING,
        allowNull: false
      },
      http_verb: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('logs');
  }
};
