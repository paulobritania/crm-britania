'use strict';

const viewName = 'vw_users_representative_codes'
const query = `SELECT
  U.username,
  URC.code
FROM
  users U
JOIN users_representative_codes URC
  ON URC.user_id = U.id

UNION ALL

SELECT
  U.username,
  URC.code
FROM
  users U
JOIN users substitute
  ON U.id = substitute.substitute_user_id
  AND GETDATE() BETWEEN substitute.substitute_user_start_date
    AND substitute.substitute_user_end_date
JOIN users_representative_codes URC
  ON URC.user_id = substitute.id
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
  }
};
