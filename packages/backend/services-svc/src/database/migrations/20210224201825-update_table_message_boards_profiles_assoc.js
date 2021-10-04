'use strict';

const table = 'message_boards_profiles_assoc'

const indexCompositeMessageBoardsProfiles = {
  name: 'idx_composite_messageBoards_to_profiles',
  unique: true
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex(table, ['message_id', 'profile_id'], indexCompositeMessageBoardsProfiles)
      .then(() => queryInterface.addConstraint(table, {
        fields: ['message_id'],
        type: 'foreign key',
        name: 'fk_message_boards_profiles_assoc_message_boards',
        references: {
          table: 'message_boards',
          field: 'id'
        }
      }))
      .then(() => queryInterface.addConstraint(table, {
        fields: ['profile_id'],
        type: 'foreign key',
        name: 'fk_message_boards_assoc_profiles_profiles_assoc',
        references: {
          table: 'profiles',
          field: 'id'
        }
      }))
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint(table, 'fk_message_boards_profiles_assoc_message_boards')
      .then(() => removeConstraint(table, 'fk_message_boards_assoc_profiles_profiles_assoc'))
      .then(() => removeIndex(table, indexCompositeMessageBoardsProfiles.name))
  }
};
