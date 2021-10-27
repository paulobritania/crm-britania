'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('users_representative_codes', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users_representative_codes');
  }
};
