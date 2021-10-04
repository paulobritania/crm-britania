'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('client_price_list', 'establishment128_cd_sp_code', 'establishment31_ag_sp_code')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('client_price_list', 'establishment31_ag_sp_code', 'establishment128_cd_sp_code')
  }
};
