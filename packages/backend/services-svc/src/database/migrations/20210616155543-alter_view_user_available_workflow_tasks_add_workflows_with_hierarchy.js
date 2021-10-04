'use strict';

const viewName = 'vw_user_available_workflow_tasks'

const oldQuery = `SELECT
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

const newQuery = `SELECT
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
    CASE
      WHEN WPR.created_at IS NULL THEN WP.created_at
      ELSE WPR.created_at
    END
  ) AS dueDate,
  WTy.description AS workflowType,
  WTy.code AS workflowTypeAlias,
  WP.identifier AS workflowIdentifier,
  NWT.title AS taskName
FROM
  USERS U
  JOIN workflow_tasks WT ON WT.profile_id IN (
    SELECT
      up.profile_id
    FROM
      users_profiles UP
    WHERE
      UP.user_id = U.id
  )
  OR (
    WT.user_id = U.id
    AND (
      U.substitute_user_start_date IS NULL
      OR U.substitute_user_end_date IS NULL
      OR GETDATE() > U.substitute_user_end_date
      OR GETDATE() < U.substitute_user_start_date
    )
  )
  OR (
    WT.user_alternate_id = U.id
    AND (
      (
        SELECT
          1
        FROM
          users us
        WHERE
          US.id = WT.user_id
          AND (
            us.substitute_user_start_date IS NULL
            OR us.substitute_user_end_date IS NULL
            OR GETDATE() > us.substitute_user_end_date
            OR GETDATE() < us.substitute_user_start_date
          )
      ) IS NOT NULL
    )
  )
  JOIN workflows_performed WP
    ON WP.workflow_id = WT.workflow_id
    AND WP.concluded = 0
  JOIN workflows W
    ON W.id = WP.workflow_id
  JOIN workflow_types WTy
    ON WTy.id = W.type_id
  LEFT JOIN workflow_performed_responses WPR
    ON WPR.workflow_performed_id = WP.id
    AND WPR.id IN (
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
    ON WTR.id = WPR.workflow_task_response_id
  LEFT JOIN workflow_tasks WTRT
    ON WTRT.id = WTR.workflow_task_id
  JOIN workflow_tasks NWT
    ON NWT.id = WT.id
    AND NWT.allow_approver_from_hierarchy = 0
    AND NWT.[order] = CASE
      WHEN WPR.id IS NULL THEN 1
      WHEN WTR.next_task_order IS NOT NULL THEN WTR.next_task_order
      ELSE WTRT.[order] + 1
    END

UNION ALL

SELECT DISTINCT
  URP.user_id AS userId,
  NWT.id AS taskId,
  CAST(
    (
      DATEDIFF(
        DAY,
        CASE
          WHEN WPLastResponse.created_at IS NULL THEN WP.created_at
          ELSE WPLastResponse.created_at
        END,
        CASE
          WHEN GETDATE() < DATEADD(
            DAY,
            NWT.deadline,
            CASE
              WHEN WPLastResponse.created_at IS NULL THEN WP.created_at
              ELSE WPLastResponse.created_at
            END
          ) THEN GETDATE()
          ELSE DATEADD(
            DAY,
            NWT.deadline,
            CASE
              WHEN WPLastResponse.created_at IS NULL THEN WP.created_at
              ELSE WPLastResponse.created_at
            END
          )
        END
      ) * 1.00
    ) / (
      DATEDIFF(
        DAY,
        CASE
          WHEN WPLastResponse.created_at IS NULL THEN WP.created_at
          ELSE WPLastResponse.created_at
        END,
        DATEADD(
          DAY,
          NWT.deadline,
          CASE
            WHEN WPLastResponse.created_at IS NULL THEN WP.created_at
            ELSE WPLastResponse.created_at
          END
        )
      ) * 1.00
    ) * 100.00 AS DECIMAL(6, 2)
  ) AS percentage,
  DATEADD(
    DAY,
    NWT.deadline,
    CASE
      WHEN WPLastResponse.created_at IS NULL THEN WP.created_at
      ELSE WPLastResponse.created_at
    END
  ) AS dueDate,
  WTy.description AS workflowType,
  WTy.code AS workflowTypeAlias,
  WP.identifier AS workflowIdentifier,
  NWT.title AS taskName
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
  JOIN workflow_tasks NWT
    ON NWT.id = WT.id
    AND NWT.[order] = CASE
      WHEN WPLastResponse.id IS NULL THEN 1
      WHEN WTR.next_task_order IS NOT NULL THEN WTR.next_task_order
      ELSE WTResponded.[order] + 1
    END
    AND NWT.allow_approver_from_hierarchy = 1
  JOIN (
    SELECT DISTINCT
      h.client_code,
      h.member_class_code,
      h.member_code
    FROM
      hierarchy h
  ) H
    ON H.client_code = WP.client_code
    AND H.member_class_code = NWT.hierarchy_level
  LEFT JOIN (
    SELECT DISTINCT
      h.client_code,
      h.member_class_code,
      h.member_code
    FROM
      hierarchy h
  ) Responsible
    ON Responsible.client_code = H.client_code
    AND Responsible.member_code = WP.responsible_code
  JOIN users_representative_codes URP
    ON URP.code = CASE
      WHEN Responsible.client_code IS NULL THEN H.member_code
      ELSE Responsible.member_code
    END
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER VIEW ${viewName} AS ${newQuery}`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER VIEW ${viewName} AS ${oldQuery}`);
  }
};
