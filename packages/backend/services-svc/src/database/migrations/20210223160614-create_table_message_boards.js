'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('message_boards', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(4000),
        allowNull: false
      },
      content: {
        type: Sequelize.STRING(4000),
        allowNull: false
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      home_screen: {
        type: Sequelize.CHAR(1),
        allowNull: true,
        defaultValue: '0',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('message_boards');
  }
};
