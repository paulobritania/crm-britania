'use strict';

const viewName = 'vw_vpc_list'
const query = `SELECT
  WV.id AS id,
  WV.request_number AS requestNumber,
  WV.parent_company_name AS parentCompanyName,
  CASE
    WHEN WV.workflow_performed_id IS NULL THEN 'OPEN'
    WHEN WPCT.workflowPerformedId IS NOT NULL THEN 'WORK_IN_PROGRESS'
    WHEN WTR.finish_workflow_with_error = 1 THEN 'CANCELED'
    ELSE 'CONCLUDED'
  END AS situation,
  WVLF.line_description AS linesDescription,
  WV.founds_type AS foundsType,
  WV.deployment_date AS deploymentDate,
  WV.value AS value,
  WT.title AS taskTitle,
  CASE
    WHEN WT.allow_approver_from_hierarchy = 1 THEN WV.approver_description
    ELSE U.username
  END AS taskResponsible,
  P.name AS taskProfile,
  CASE
    WHEN LastResponse.created_at IS NULL THEN NULL
    ELSE DATEADD(DAY, WT.deadline, LastResponse.created_at)
  END AS sla,
  WV.cnpj AS cnpj,
  WV.parent_company_code AS parentCompanyCode,
  WV.start_date AS startDate,
  WV.end_date AS endDate,
  WV.approver_code AS approverCode,
  WVLF.line_code AS lineCode
FROM
  workflow_vpc WV
LEFT JOIN workflows_performed WP
  ON WP.id = WV.workflow_performed_id
LEFT JOIN vw_workflows_performed_current_task WPCT
  ON WPCT.workflowPerformedId = WP.id
LEFT JOIN workflow_tasks WT
  ON WT.id = WPCT.workflowTaskId
LEFT JOIN users U
  ON U.id = WT.user_id
LEFT JOIN profiles P
  ON P.id = WT.profile_id
LEFT JOIN workflow_vpc_lines_families WVLF
  ON WVLF.workflow_vpc_id = WV.id
LEFT JOIN workflow_vpc_status WVS
  ON WVS.id = WV.status_id
OUTER APPLY (
  SELECT
    WPR.workflow_task_response_id,
	WPR.created_at
  FROM workflow_performed_responses WPR
  WHERE WPR.workflow_performed_id = WP.id
    AND WPR.created_at = (
      SELECT MAX(created_at)
      FROM workflow_performed_responses WPR2
      WHERE WPR2.workflow_performed_id = WP.id
  )
) LastResponse
LEFT JOIN workflow_task_responses WTR
  ON WTR.id = LastResponse.workflow_task_response_id
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
  }
};
