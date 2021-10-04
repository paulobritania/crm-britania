import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'

import moment from 'moment'
import PropTypes from 'prop-types'

import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'

import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import ImageOutlined from '@material-ui/icons/ImageOutlined'

import { useDialog } from '@britania-crm/dialog'
import messageSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/messageboard/message.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { AppActions } from '@britania-crm/stores/app'
import { MessageActions } from '@britania-crm/stores/message'
import {
  getOneMessage,
  getLoading
} from '@britania-crm/stores/message/message.selectors'
import {
  dateBackFormat,
  dateTimeBackFormat
} from '@britania-crm/utils/date'
import Button from '@britania-crm/web-components/Button'
import Checkbox from '@britania-crm/web-components/Checkbox'
import Form from '@britania-crm/web-components/Form'
import InputDate from '@britania-crm/web-components/InputDate'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'
import RichTextEditor from '@britania-crm/web-components/RichTextEditor'

import ProfileLinkModal from '../ProfileLinkModal'
import useStyles from './styles'

const CreateMessageboardModal = ({
  id,
  handleClose,
  open,
  messageId,
  onSave
  // onSaveCreate,
  // onSaveEdit,
}) => {
  const classes = useStyles()
  const t = useT()
  const dispatch = useCallback(useDispatch(), [])
  const { createDialog } = useDialog()

  const formRef = useRef(null)

  const [mounted, setMounted] = useState(false)
  const [profilesSelected, setProfilesSelected] = useState([])
  const [files, setFiles] = useState([])

  const message = useSelector(getOneMessage)
  const loading = useSelector(getLoading)

  const filterNameProfileSelected = useMemo(() => {
    const profiles = map(profilesSelected, ({ name }) => name)
    return profiles.join(', ')
  }, [profilesSelected])

  const today = useMemo(() => moment().format(dateBackFormat), [])

  const handleOpenProfileLinkModal = useCallback(() => {
    createDialog({
      id: 'profileLinkModal',
      Component: ProfileLinkModal,
      props: {
        initialProfiles: formRef.current.getFieldValue('profiles'),
        onSave (profiles) {
          formRef.current.setFieldValue('profiles', profiles)
        }
      }
    })
  }, [createDialog])

  const handleClean = useCallback(() => {
    formRef.current.reset()
    dispatch(MessageActions.cleanMessage())
  }, [dispatch])

  const handleGetOneMessage = useCallback(() => {
    if (messageId) {
      dispatch(MessageActions.getOneMessage(messageId))
    }
  }, [dispatch, messageId])

  const fileChip = useMemo(
    () => {
      const file = files?.[0]
      return file && (
        <Chip
          label={ file.name || file?.file?.filename }
          variant="outlined"
          deleteIcon={ <DeleteIcon className={ classes.iconImage } /> }
          onDelete={ () => setFiles([]) }
          icon={ <ImageOutlined className={ classes.iconImage } /> }
          classes={ { root: classes.chip, label: classes.labelChip } }
        />
      )
    },
    [classes.chip, classes.iconImage, classes.labelChip, files]
  )

  const insertFile = useCallback((newFiles) => {
    if (!isEmpty(files)) {
      dispatch(AppActions.addAlert({ type: 'error', message: 'É permitido somente um anexo por recado.' }))
    } else {
      setFiles(newFiles)
    }
  }, [dispatch, files])

  const handleSubmit = useCallback(
    (values) => {
      const payload = {
        ...values,
        profiles: map(values.profiles, ({ id }) => id).join(),
        homeScreen: values.homeScreen ? '1' : '0',
        files
      }

      if (messageId) {
        if (!isEmpty(message.files) && !isEqual(message.files, files)) {
          dispatch(MessageActions.deleteMessageAttachment(
            messageId,
            message.files
          ))
        }
        dispatch(MessageActions.updateMessage(
          messageId,
          payload,
          () => {
            onSave()
            handleClose()
          }
        ))
      } else {
        dispatch(MessageActions.createMessage(
          payload,
          () => {
            onSave()
            handleClose()
          }
        ))
      }
    },
    [dispatch, files, handleClose, message.files, messageId, onSave]
  )

  useLayoutEffect(
    () => {
      dispatch(MessageActions.cleanMessage())
    },
    [dispatch]
  )

  useEffect(() => {
    handleGetOneMessage()
  }, [handleGetOneMessage])

  useEffect(() => {
    if (mounted && !isEmpty(message)) {
      formRef.current.setData({
        ...message,
        expirationDate: moment(message.expirationDate, dateTimeBackFormat).format(dateBackFormat),
        homeScreen: message.homeScreen === '1',
        profiles: first(message.messageProfile)?.profile || []
      })
      setFiles(message.files)
    } else if (!mounted) {
      setMounted(true)
    }
  }, [message, mounted])

  return (
    <Modal
      id={ id }
      open={ open }
      classes={ { paperScrollPaper: classes.modal } }
      maxWidth="lg"
    >
      <CardContent className={ classes.card }>
        <Form
          ref={ formRef }
          schemaConstructor={ messageSchema }
          defaultValues={ INITIAL_VALUES }
          onSubmit={ handleSubmit }
        >
          <Grid container spacing={ 1 }>

            <Grid item xs={ 12 }>
              <I18n as={ Typography } variant="h6" gutterBottom className={ classes.title } >
                { messageId ? 'edit message board' : 'new message board' }
              </I18n>
            </Grid>

            <Grid item xs={ 12 } className={ classes.items }>
              <InputText
                name="title"
                label={ t('message board title') }
              />

              <I18n as={ Button }
                color="warning"
                variant="contained"
                onClick={ handleOpenProfileLinkModal }
                className={ classes.btn }
                params={ { howMany: 2 } }
              >
                link profile
              </I18n>

              <InputText
                detached
                name="profiles"
                label={ t('linked profiles') }
                value={ filterNameProfileSelected }
                disabled
                required
                style={ { marginBottom: 0 } }
              />
              <InputHidden
                name="profiles"
                showError
                onValueChange={ setProfilesSelected }
              />

              <Grid item xs={ 12 } className={ classes.row }>
                <InputDate
                  name="expirationDate"
                  label={ t('validity') }
                  min={ today }
                />

                <Checkbox
                  name="homeScreen"
                  label={ t('home screen') }
                />
              </Grid>

              <RichTextEditor
                name="content"
                label={ t('message') }
                getFiles={ insertFile }
              />

              <Grid item className={ classes.cardImage }>
                { fileChip }
              </Grid>

            </Grid>

          </Grid>
        </Form>
      </CardContent>

      <CardActions className={ classes.buttons }>
        <Grid item className={ classes.btnClean }>
          <I18n as={ Button }
            variant="text"
            color="secondary"
            onClick={ handleClean }
            disabled={ loading }
          >
            clean
          </I18n>
        </Grid>
        <Grid item className={ classes.btnsSaveAndCancel }>
          <I18n as={ Button }
            color="secondary"
            variant="outlined"
            disabled={ loading }
            onClick={ handleClose }
          >
            cancel
          </I18n>
          <I18n as={ Button }
            color="secondary"
            variant="contained"
            onClick={ () => formRef.current.submit() }
            className={ classes.btnSave }
            disabled={ loading }
            isLoading={ loading }
          >
            save
          </I18n>
        </Grid>
      </CardActions>
    </Modal>
  )
}

CreateMessageboardModal.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  messageId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

CreateMessageboardModal.defaultProps = {
  onSave () {},
  messageId: null
}

export default CreateMessageboardModal
