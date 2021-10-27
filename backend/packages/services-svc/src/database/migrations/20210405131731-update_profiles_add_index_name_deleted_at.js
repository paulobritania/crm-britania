'use strict';

const indexCompositeNameDeletedAt = {
  name: 'UX_profiles_name_deleted_at',
  unique: true
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex('profiles', ['name', 'deleted_at'], indexCompositeNameDeletedAt)
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('profiles', indexCompositeNameDeletedAt.name)
  }
};
