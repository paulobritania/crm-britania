import React, {
  useMemo,
  useEffect,
  useCallback,
  useState,
  useRef
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  useHistory,
  useLocation
} from 'react-router-dom'

import moment from 'moment/moment'

import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { MSG031 } from '@britania-crm/constants/feedbackMessages.constants'
import { useDialog } from '@britania-crm/dialog'
import { useFormEffect } from '@britania-crm/forms'
import workflowSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/workflow/workflow.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { AccessActions } from '@britania-crm/stores/access'
import { AppActions } from '@britania-crm/stores/app'
import { ProfilesActions } from '@britania-crm/stores/profiles'
import { WorkflowActions } from '@britania-crm/stores/workflow'
import {
  getOneWorkflow,
  getWorkflowTypes,
  getLoadingStatus
} from '@britania-crm/stores/workflow/workflow.selectors'
import colors from '@britania-crm/styles/colors'
import {
  formatBackDateTimeToBackDateFormat,
  dateBackFormat
} from '@britania-crm/utils/date'
import Button from '@britania-crm/web-components/Button'
import CheckboxStatus from '@britania-crm/web-components/CheckboxStatus'
import Form from '@britania-crm/web-components/Form'
import InputDate from '@britania-crm/web-components/InputDate'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import InputUsername from '@britania-crm/web-components/InputUsername'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import TreeView from '@britania-crm/web-components/TreeView'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import TaskCreationModal from '../../modals/TaskCreationModal'
import HistoricAccordion from './Historic'
import {
  PageWrapper,
  useStyles,
  TreeViewContainer
} from './styled'
import {
  formatTasks,
  formatRequest
} from './utils'

const WorkflowPanelCreateScreen = () => {
  const dispatch = useCallback(useDispatch(), [])
  const classes = useStyles()
  const t = useT()
  const { createDialog } = useDialog()
  const history = useHistory()
  const { state } = useLocation()
  const {
    routes,
    currentRoutePermissions,
    currentPath
  } = useRoutes()

  const [tasks, setTasks] = useState([])

  const workflow = useSelector(getOneWorkflow)
  const workflowTypes = useSelector(getWorkflowTypes)
  const loadingStatus = useSelector(getLoadingStatus)

  const formRef = useRef(null)

  const workflowStatus = useMemo(
    () => !isEmpty(workflow) && workflow.status !== 'INACTIVE',
    [workflow]
  )

  const workflowId = useMemo(
    () => state?.workflowId,
    [state]
  )

  const goBackTo = useMemo(
    () => state?.goBackTo,
    [state]
  )

  const mode = useMemo(
    () => {
      switch (currentPath) {
        case routes.workflowPanelCreate.path: return 'create'
        case routes.workflowPanelEdit.path: return 'edit'
        default: return 'view'
      }
    },
    [currentPath, routes.workflowPanelCreate.path, routes.workflowPanelEdit.path]
  )

  const title = useMemo(() => {
    switch (mode) {
      case 'create': return t('new workflow')
      case 'edit': return t('edit workflow')
      default: return t('view of {this}', { this: t('workflow panel') })
    }
  }, [mode, t])

  const isView = useMemo(() => mode === 'view', [mode])

  const handleGoBack = useCallback(
    () => history.push(goBackTo || routes.workflowPanel.path),
    [goBackTo, history, routes.workflowPanel.path]
  )

  const handleSubmit = useCallback(
    (values) => {
      if (isEmpty(tasks)) {
        return dispatch(AppActions.addAlert({
          type: 'error',
          message: MSG031
        }))
      }

      const payload = formatRequest(values, tasks)
      const action = mode === 'create'
        ? WorkflowActions.createWorkflow(payload, handleGoBack)
        : WorkflowActions.updateWorkflow(payload, workflowId, handleGoBack)
      dispatch(action)
    },
    [dispatch, handleGoBack, mode, tasks, workflowId]
  )

  const handleOpenTaskCreationModal = useCallback(
    (task) => {
      createDialog({
        id: 'taskCreationModal',
        Component: TaskCreationModal,
        props: {
          allTasks: tasks,
          task,
          onSubmit: setTasks
        }
      })
    },
    [createDialog, tasks]
  )

  const onAddNewTaskComplete = useCallback(
    (newTask) => {
      setTasks((prevState) => ([...prevState, newTask]))
    },
    []
  )

  const handleConfirmCancel = useCallback(
    () => {
      createDialog({
        id: 'confirm-cancel',
        Component: ConfirmModal,
        props: {
          onConfirm: handleGoBack,
          text: mode === 'create'
            ? t('Do you want to cancel the registration?')
            : t('Do you want to cancel editing?')
        }
      })
    },
    [createDialog, mode, handleGoBack, t]
  )

  const handleInactive = useCallback(
    () => {
      createDialog({
        id: 'confirm-cancel',
        Component: ConfirmModal,
        props: {
          text: t('Do you want to deactivate the workflow?'),
          onConfirm () {
            dispatch(WorkflowActions.deactivateWorkflow(
              workflowId,
              handleGoBack
            ))
          }
        }
      })
    },
    [createDialog, dispatch, handleGoBack, t, workflowId]
  )

  const leftButton = useMemo(
    () => {
      if (mode === 'edit' && currentRoutePermissions.INATIVAR) {
        return (
          <I18n as={ Button }
            isLoading={ loadingStatus?.inactivate }
            disabled= { loadingStatus?.save }
            color="secondary"
            variant="outlined"
            onClick={ handleInactive }
          >
            inactivate
          </I18n>
        )
      } else if (mode === 'create') {
        return (
          <I18n as={ Button }
            color="secondary"
            className={ classes.resetBtn }
            disabled={ loadingStatus?.inactivate || loadingStatus?.save }
            variant="text"
            onClick={ () => {
              setTasks([])
              formRef.current.reset()
            } }
          >
            clean
          </I18n>
        )
      }
      return null
    },
    [classes.resetBtn, currentRoutePermissions.INATIVAR, handleInactive, loadingStatus.inactivate, loadingStatus.save, mode]
  )

  const statusLabel = useMemo(
    () => {
      if (workflow.status === 'ACTIVE') {
        return t('running')
      } else if (workflow.status === 'PROGRAMMED') {
        return t('programmed')
      } else if (workflow.status === 'EXPIRED') {
        return t('overdue')
      } else {
        return undefined
      }
    },
    [t, workflow]
  )

  const statusColor = useMemo(
    () => {
      if (workflow.status === 'PROGRAMMED') {
        return colors.warning.main
      } else if (workflow.status === 'EXPIRED') {
        return colors.orange.base
      }
    },
    [workflow]
  )

  const minFrom = useMemo(() => moment().format(dateBackFormat), [])

  const schemaConstructor = useCallback(
    (options) => workflowSchema({ ...options, minFrom }),
    [minFrom]
  )

  useEffect(() => {
    if (workflowId) {
      dispatch(WorkflowActions.getOneWorkflow(workflowId))
    }
    dispatch(WorkflowActions.getWorkflowTypes())
  }, [dispatch, workflowId])

  useEffect(() => {
    dispatch(AccessActions.getAllAccesses())
    dispatch(ProfilesActions.getAllProfiles())
  }, [dispatch])

  useFormEffect(() => {
    if (!isEmpty(workflow) && workflowId) {
      formRef.current.setData({
        ...workflow,
        title: workflow.title,
        typeId: find(
          workflowTypes,
          (element) => element.description === workflow.type
        )?.id || '',
        period: {
          from: formatBackDateTimeToBackDateFormat(workflow.dateStart),
          to: formatBackDateTimeToBackDateFormat(workflow.dateEnd)
        },
        description: workflow.description,
        lastUpdateLogin: workflow.lastUpdateLogin,
        version: workflow.version,
        lastUpdateDate: formatBackDateTimeToBackDateFormat(workflow.lastUpdateDate)
      })

      const tasks = formatTasks(workflow.tasks)
      setTasks(tasks)
    }
  }, [mode, workflow, workflowId, workflowTypes])

  return (
    <PageWrapper>
      <Grid container classes={ { root: classes.container } }>
        <Grid item sm={ 12 } className={ classes.header }>
          <Typography className={ classes.title } variant="h4" gutterBottom >
            {title}
          </Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <CardContent className={ classes.card }>
            <Form
              ref={ formRef }
              schemaConstructor={ schemaConstructor }
              defaultValues={ INITIAL_VALUES }
              onSubmit={ handleSubmit }
            >
              <Grid container spacing={ 1 }>
                <Grid item sm={ 12 } md={ 4 }>
                  <InputText
                    name="title"
                    label={ t('workflow title') }
                    disabled={ isView }
                    inputProps={ { maxLength: 81 } }
                    touchOnChange
                  />
                </Grid>

                <Grid item sm={ 12 } md={ 4 }>
                  <InputSelect
                    name="typeId"
                    label={ t('type') }
                    options={ workflowTypes }
                    valueKey="description"
                    disabled={ isView }
                  />
                </Grid>

                <Grid item sm={ 12 } md={ 4 }>
                  <InputDateRange
                    disabled={ isView }
                    min={ minFrom }
                    name="period"
                    label={ t('period', { howMany: 1 }) }
                  />
                </Grid>

                <Grid item sm={ 12 } md={ 12 }>
                  <InputText
                    name="description"
                    label={ t('description') }
                    disabled={ isView }
                    inputProps={ { maxLength: 201 } }
                    touchOnChange
                  />
                </Grid>

                {mode !== 'create' && (
                  <>
                    <Grid item sm={ 12 } md={ 2 } style={ { display: 'flex', alignItems: 'center' } }>
                      <CheckboxStatus
                        name="status"
                        detached
                        value={ workflowStatus }
                        activeStatus={ statusLabel }
                        activeColor={ statusColor }
                        disabled
                      />
                    </Grid>

                    <Grid item sm={ 12 } md={ 4 }>
                      <InputUsername
                        name="lastUpdateLogin"
                        label={ t('login last change') }
                        disabled
                      />
                    </Grid>

                    <Grid item sm={ 12 } md={ 4 }>
                      <InputDate
                        name="lastUpdateDate"
                        label={ t('date last edit') }
                        disabled
                      />
                    </Grid>
                    <Grid item sm={ 12 } md={ 2 }>
                      <InputText
                        name="version"
                        label={ t('version') }
                        disabled
                      />
                    </Grid>
                  </>
                )}
              </Grid>

              <TreeViewContainer>
                <TreeView
                  items={ tasks }
                  onChange={ setTasks }
                  onAddOrEditTask={ handleOpenTaskCreationModal }
                  onAddNewTaskComplete={ onAddNewTaskComplete }
                  isTaskView
                  id="tree"
                  readOnly={ mode === 'view' }
                />
              </TreeViewContainer>

              {mode === 'view' && (
                <HistoricAccordion workflow={ workflow } />
              )}

            </Form>
          </CardContent>

          <CardActions className={ classes.buttons }>
            {mode === 'view' ? (
              <>
                <Grid item>
                  {leftButton}
                </Grid>

                <Grid item>
                  <I18n as={ Button }
                    type="reset"
                    color="secondary"
                    variant="outlined"
                    disabled= { loadingStatus?.save || loadingStatus?.inactivate }
                    onClick={ handleGoBack }
                  >
                  back
                  </I18n>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  {leftButton}
                </Grid>

                <Grid item>
                  <I18n
                    as={ Button }
                    variant="outlined"
                    color="secondary"
                    disabled= { loadingStatus?.save || loadingStatus?.inactivate }
                    onClick={ handleConfirmCancel }
                  >
                    cancel
                  </I18n>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={ classes.btnSave }
                    isLoading={ loadingStatus?.save }
                    disabled= { loadingStatus?.inactivate }
                    onClick={ () => formRef.current.submit() }
                  >
                    { mode === 'create' ? t('finish registration') : t('save') }
                  </Button>
                </Grid>
              </>
            )}
          </CardActions>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default WorkflowPanelCreateScreen
