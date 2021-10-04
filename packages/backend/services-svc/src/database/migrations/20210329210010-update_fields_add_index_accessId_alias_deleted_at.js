'use strict';

const indexCompositeAccessIdAliasDeletedAt = {
  name: 'UX_fields_accessId_alias_deleted_at',
  unique: true
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex('fields', ['access_id', 'alias', 'deleted_at'], indexCompositeAccessIdAliasDeletedAt)
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('fields', indexCompositeAccessIdAliasDeletedAt.name)
  }
};
