'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_profiles', {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
      },
      profile_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('users_profiles');
  }
};
