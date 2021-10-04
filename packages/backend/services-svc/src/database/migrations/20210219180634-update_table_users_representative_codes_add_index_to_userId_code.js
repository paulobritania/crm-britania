'use strict';

const indexCompositeUserIdCode = {
  name: 'users_representative_codes_userId_code',
  unique: true
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex('users_representative_codes', ['user_id', 'code'], indexCompositeUserIdCode)
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('users_representative_codes', indexCompositeUserIdCode.name)
  }
};
