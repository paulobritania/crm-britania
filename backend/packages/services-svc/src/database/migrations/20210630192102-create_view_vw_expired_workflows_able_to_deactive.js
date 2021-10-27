'use strict';

const viewName = 'vw_expired_workflows_able_to_deactive'

const query = `SELECT
  expired.id
FROM
  workflows expired
JOIN workflows actives
  ON actives.type_id = expired.type_id
    AND actives.active = 1
    AND actives.date_start <= GETUTCDATE()
    AND actives.date_start > expired.date_start
WHERE expired.active = 1
  AND expired.date_end < GETUTCDATE()
GROUP BY
  expired.id`

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`);
    },

    down: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
  };
