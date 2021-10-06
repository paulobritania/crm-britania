'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('workflow_histories', 'updatedFields', 'updated_fields');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('workflow_histories', 'updated_fields', 'updatedFields');
  }
};
