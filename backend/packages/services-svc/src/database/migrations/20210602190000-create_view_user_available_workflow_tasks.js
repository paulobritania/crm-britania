'use strict';

const viewName = 'vw_user_available_workflow_tasks'
const query = `SELECT
  U.id AS userId,
  NWT.id AS taskId,
  CAST(
    (
      DATEDIFF(
        DAY,
        CASE
          WHEN WPR.created_at IS NULL THEN WP.created_at
          ELSE WPR.created_at
        END,
        CASE
          WHEN GETDATE() < DATEADD(
            DAY,
            NWT.deadline,
            CASE
              WHEN WPR.created_at IS NULL THEN WP.created_at
              ELSE WPR.created_at
            END
          ) THEN GETDATE()
          ELSE DATEADD(
            DAY,
            NWT.deadline,
            CASE
              WHEN WPR.created_at IS NULL THEN WP.created_at
              ELSE WPR.created_at
            END
          )
        END
      ) * 1.00
    ) / (
      DATEDIFF(
        DAY,
        CASE
          WHEN WPR.created_at IS NULL THEN WP.created_at
          ELSE WPR.created_at
        END,
        DATEADD(
          DAY,
          NWT.deadline,
          CASE
            WHEN WPR.created_at IS NULL THEN WP.created_at
            ELSE WPR.created_at
          END
        )
      ) * 1.00
    ) * 100.00 AS DECIMAL(6, 2)
  ) AS percentage,
  DATEADD(
	DAY,
	NWT.deadline,
	CASE WHEN WPR.created_at IS NULL THEN WP.created_at
	ELSE WPR.created_at
	END
  ) AS dueDate,
  WTy.description AS workflowType,
  WTy.code AS workflowTypeAlias,
  WP.identifier AS workflowIdentifier,
  NWT.title AS taskName
FROM USERS U
JOIN users_profiles UP
  ON UP.user_id = U.id
JOIN workflow_tasks WT
  ON WT.profile_id = UP.profile_id
  OR (
    WT.user_id = U.id
    AND (
      U.substitute_user_start_date IS NULL
      OR U.substitute_user_end_date IS NULL
      OR GETDATE() > U.substitute_user_end_date
      OR GETDATE() < U.substitute_user_start_date
    )
  ) OR (
    WT.user_alternate_id = U.id
    AND (
      (
        SELECT 1
        FROM users us
        WHERE US.id = WT.user_id
        AND (
          us.substitute_user_start_date IS NULL
          OR us.substitute_user_end_date IS NULL
          OR GETDATE() > us.substitute_user_end_date
          OR GETDATE() < us.substitute_user_start_date
        )
      ) IS NOT NULL
    )
  )
JOIN workflows W
  ON W.id = WT.workflow_id
JOIN workflow_types WTy
  ON WTy.id = W.type_id
JOIN workflows_performed WP
  ON WP.workflow_id = WT.workflow_id
  AND WP.concluded = 0
LEFT JOIN workflow_performed_responses WPR
  ON WPR.workflow_performed_id = WP.id
  AND WPR.id IN (
    SELECT MAX(ID)
    FROM workflow_performed_responses wfpr
    WHERE wfpr.workflow_performed_id = WP.id
    GROUP BY wfpr.workflow_performed_id
  )
LEFT JOIN workflow_task_responses WTR
  ON WTR.id = WPR.workflow_task_response_id
LEFT JOIN workflow_tasks WTRT
  ON WTRT.id = WTR.workflow_task_id
JOIN workflow_tasks NWT
  ON NWT.id = WT.id
  AND NWT.[order] = CASE
    WHEN WPR.id IS NULL THEN 1
    WHEN WTR.next_task_order IS NOT NULL THEN WTR.next_task_order
    ELSE WTRT.[order] + 1
  END
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
  }
};
