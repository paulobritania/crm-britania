'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('buyers_address', 'street'),
      queryInterface.removeColumn('buyers_address', 'number'),
      queryInterface.removeColumn('buyers_address', 'district'),
      queryInterface.removeColumn('buyers_address', 'city'),
      queryInterface.removeColumn('buyers_address', 'uf'),
      queryInterface.removeColumn('buyers_address', 'cep'),
      queryInterface.removeColumn('buyers_address', 'complement'),

      queryInterface.renameColumn('buyers_address', 'id', 'id_buyers'),

      queryInterface.addColumn('buyers_address', 'id_address', {
        type: Sequelize.INTEGER,
        primaryKey: true,
      }),

      queryInterface.addConstraint('buyers_address', {
        fields: ['id_address'],
        type: 'foreign key',
        name: 'fk_buyers_address_to_address',
        references: {
          table: 'address',
          field: 'id'
        }
      }),

      queryInterface.addColumn('buyers_address', 'address_type', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }),

      queryInterface.addColumn('buyers_address', 'delivery_type', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('buyers_address', 'street'),
      queryInterface.addColumn('buyers_address', 'number'),
      queryInterface.addColumn('buyers_address', 'district'),
      queryInterface.addColumn('buyers_address', 'city'),
      queryInterface.addColumn('buyers_address', 'uf'),
      queryInterface.addColumn('buyers_address', 'cep'),
      queryInterface.addColumn('buyers_address', 'complement'),

      queryInterface.renameColumn('buyers_address', 'id_buyers', 'id'),

      queryInterface.removeColumn('buyers_address', 'id_address'),
      queryInterface.removeColumn('buyers_address', 'address_type'),
      queryInterface.removeColumn('buyers_address', 'delivery_type'),

      queryInterface.removeConstraint('companies', 'fk_buyers_address_to_address')
    ])
  }
};
