'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('message_boards_profiles_assoc', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      message_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('message_boards_profiles_assoc');
  }
};