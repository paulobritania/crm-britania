'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_price_list', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      establishment128_cd_es_code: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      establishment22_code: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      establishment15_code: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      establishment31_manaus_code: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      establishment31_ag_sc_code: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      establishment128_cd_sp_code: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
      establishment305_cd_pe: {
        type: Sequelize.STRING(100),
        allowNull: true 
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_price_list')
  }
};
