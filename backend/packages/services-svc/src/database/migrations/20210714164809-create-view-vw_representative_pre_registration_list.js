'use strict';

const viewName = 'vw_representative_pre_registration_list'
const query = `
SELECT
  WRR.id AS id,
  WP.id AS WPID,
  WRR.cnpj AS cnpj,
  WRR.company_name AS companyName,
  WRR.commercial_phone AS commercialPhone,
  RF.short_name AS shortName,
  WRR.email AS email,
  WT.title AS workflowTaskTitle,
  CASE
    WHEN WRR.workflow_performed_id IS NULL THEN 'OPEN'
    WHEN WPCT.workflowPerformedId IS NOT NULL THEN 'WORK_IN_PROGRESS'
    WHEN WTR.finish_workflow_with_error = 1 THEN 'CANCELED'
    ELSE 'CONCLUDED'
  END AS status
FROM workflow_representative_registration WRR
LEFT JOIN workflows_performed WP
  ON WP.id = WRR.workflow_performed_id
LEFT JOIN vw_workflows_performed_current_task WPCT
  ON WPCT.workflowPerformedId = WP.id
LEFT JOIN workflow_tasks WT
  ON WT.id = WPCT.workflowTaskId
OUTER APPLY (
  SELECT
    WPR.workflow_task_response_id
  FROM workflow_performed_responses WPR
  WHERE WPR.workflow_performed_id = WP.id
    AND created_at = (
      SELECT MAX(created_at)
      FROM workflow_performed_responses WPR2
      WHERE WPR2.workflow_performed_id = WP.id
  )
) LastResponse
LEFT JOIN workflow_task_responses WTR
  ON WTR.id = LastResponse.workflow_task_response_id
LEFT JOIN representative_financial RF
  ON WRR.representative_financial_id = RF.id
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
  }
};
