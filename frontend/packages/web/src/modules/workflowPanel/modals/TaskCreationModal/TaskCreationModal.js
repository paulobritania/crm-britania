import React, {
  useState,
  useCallback,
  useEffect,
  useRef
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'

import PropTypes from 'prop-types'
import uuid from 'short-uuid'

import filter from 'lodash/filter'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import {
  MSG029,
  MSG030
} from '@britania-crm/constants/feedbackMessages.constants'
import {
  treeTypes,
  errorTypes
} from '@britania-crm/constants/workflow.constants'
import taskSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/workflow/task.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { users } from '@britania-crm/services/apis/crmApi/resources/routes'
import { AppActions } from '@britania-crm/stores/app'
import { getAllProfiles } from '@britania-crm/stores/profiles/profiles.selectors'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'
import TreeView from '@britania-crm/web-components/TreeView'
import {
  responseValidationSchema,
  conditionValidationSchema
} from '@britania-crm/web-components/TreeView/validationSchemas'

import {
  useStyles,
  TreeViewArea,
  Footer
} from './styles'

const TaskCreationModal = (props) => {
  const {
    id, open, handleClose, task, allTasks, onSubmit
  } = props
  const t = useT()
  const profiles = useSelector(getAllProfiles)

  const formRef = useRef(null)

  const [mounted, setMounted] = useState(false)
  const [items, setItems] = useState(task?.children || [])

  const classes = useStyles()
  const dispatch = useCallback(useDispatch(), [])

  const handleSubmit = useCallback(
    async (values) => {
      const responses = filter(items, (item) => item.type?.type === treeTypes.RESPONSE.type)

      if (isEmpty(responses)) {
        return dispatch(AppActions.addAlert({
          type: 'error',
          message: MSG029
        }))
      }

      if (find(allTasks, (item) => item.title === values.title && item.title !== task.title)) {
        formRef.current.setFieldError('title', t('the title entered already exists in another task'))
        return dispatch(AppActions.addAlert({
          type: 'error',
          message: errorTypes.WORKFLOW_INVALID_TITLES
        }))
      }

      const conditions = filter(items, (item) => item.type?.type === treeTypes.CONDITION.type)

      const responsesAreValid = await responseValidationSchema.isValid(responses)
      const conditionsAreValid = await conditionValidationSchema.isValid(conditions)

      if (!responsesAreValid || !conditionsAreValid) {
        return dispatch(AppActions.addAlert({
          type: 'error',
          message: MSG030
        }))
      }

      onSubmit((prevState) => {
        const tmp = [...prevState]

        const itemIndex = findIndex(prevState, (item) => item.id === task.id)

        if (itemIndex !== -1) {
          tmp[itemIndex] = {
            ...tmp[itemIndex],
            title: values.title,
            profile: find(profiles, (item) => item.id === values.systemProfile),
            user: values.user,
            userId: values.user?.id,
            userAlternate: values.userAlternate,
            userAlternateId: values.userAlternate?.id,
            deadline: Number(values.slaTime),
            children: items
          }
        } else {
          tmp.push({
            id: uuid().new(),
            type: treeTypes.TASK,
            title: values.title,
            children: items,
            profile: find(profiles, (item) => item.id === values.systemProfile),
            user: values.user,
            userId: values.user?.id,
            userAlternate: values.userAlternate,
            deadline: Number(values.slaTime),
            userAlternateId: values.userAlternate?.id
          })
        }

        return tmp
      })

      handleClose()
    },
    [allTasks, dispatch, handleClose, items, onSubmit, profiles, t, task.id, task.title]
  )

  const clearForm = useCallback(
    () => {
      formRef.current.reset()
      setItems([])
    },
    []
  )

  useEffect(
    () => {
      if (mounted && !isEmpty(task)) {
        formRef.current.setData({
          title: task.title || '',
          systemProfile: task.profile?.id || INITIAL_VALUES.systemProfile,
          user: task.userId ? task.user : INITIAL_VALUES.user,
          userAlternate: task.userAlternateId ? task.userAlternate : INITIAL_VALUES.userAlternate,
          slaTime: String(task.deadline) || ''
        })
      } else if (!mounted) {
        setMounted(true)
      }
    },
    [mounted, task]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('task and response registration') }
      onClose={ handleClose }
      maxWidth="lg"
      fullWidth
      disableFullScreen
    >
      <Form
        ref={ formRef }
        schemaConstructor={ taskSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <>
          <Grid container spacing={ 1 }>

            <Grid item sm={ 12 } md>
              <InputText
                name="title"
                label={ t('title') }
              />
            </Grid>

            <Grid item sm={ 12 } md>
              <InputSelect
                name="systemProfile"
                label={ t('system profile') }
                options={ profiles }
              />
            </Grid>

            <Grid item sm={ 12 } md>
              <InputAutocomplete
                name="user"
                label={ t('user', { howMany: 1 }) }
                url={ users.autoComplete }
              />
            </Grid>

            <Grid item sm={ 12 } md>
              <InputAutocomplete
                name="userAlternate"
                label={ t('alternate', { howMany: 1 }) }
                url={ users.autoComplete }
              />
            </Grid>

            <Grid item sm={ 12 } md>
              <InputNumber
                name="slaTime"
                label={ t('sla time') }
              />
            </Grid>

          </Grid>

          <TreeViewArea>
            <TreeView
              items={ items }
              onChange={ setItems }
              forms={ [] }
              fields={ [] }
              conditions={ [] }
              allTasks={ allTasks }
              task={ task }
              id="task-creation-tree-view"
            />
          </TreeViewArea>

          <Footer>
            <I18n as={ Button }
              variant="text"
              color="secondary"
              onClick={ clearForm }
            >
              clean
            </I18n>
            <div>
              <I18n
                as={ Button }
                variant="outlined"
                color="secondary"
                onClick={ handleClose }
              >
                cancel
              </I18n>
              <I18n
                as={ Button }
                color="secondary"
                className={ classes.blueButton }
                onClick={ () => formRef.current.submit() }
              >
                save task
              </I18n>
            </div>
          </Footer>
        </>
      </Form>
    </Modal>
  )
}

TaskCreationModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.object,
  allTasks: PropTypes.array
}

TaskCreationModal.defaultProps = {
  task: {},
  allTasks: []
}

export default TaskCreationModal
