'use strict';

const viewName = 'vw_workflows_performed_current_task'
const query = `SELECT
  W.id AS workflowId,
  WP.id AS workflowPerformedId,
  WTy.id AS workflowTypeId,
  WCurrentTask.id AS workflowTaskId
FROM
  workflows_performed WP
JOIN workflows W
  ON W.id = WP.workflow_id
JOIN workflow_tasks WT
  ON WT.workflow_id = W.id
JOIN workflow_types WTy
  ON WTy.id = W.type_id
LEFT JOIN workflow_performed_responses WPLastResponse
  ON WPLastResponse.workflow_performed_id = WP.id
  AND WPLastResponse.id IN (
    SELECT
      MAX(ID)
    FROM
      workflow_performed_responses wfpr
    WHERE
      wfpr.workflow_performed_id = WP.id
    GROUP BY
      wfpr.workflow_performed_id
  )
LEFT JOIN workflow_task_responses WTR
  ON WTR.id = WPLastResponse.workflow_task_response_id
LEFT JOIN workflow_tasks WTResponded
  ON WTResponded.id = WTR.workflow_task_id
JOIN workflow_tasks WCurrentTask
  ON WCurrentTask.id = WT.id
  AND WCurrentTask.[order] = CASE
    WHEN WPLastResponse.id IS NULL THEN 1
    WHEN WTR.next_task_order IS NOT NULL THEN WTR.next_task_order
    ELSE WTResponded.[order] + 1
  END
WHERE WP.concluded = 0


`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
  }
};
