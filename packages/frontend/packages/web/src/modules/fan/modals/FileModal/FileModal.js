import React, {
  useRef,
  useCallback,
  useState,
  useMemo
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import attachmentsSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/fan/attachments.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { FanActions } from '@britania-crm/stores/fan'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'
import UploadImage from '@britania-crm/web-components/UploadImage'

import useStyles, { ButtonContainer } from './styles'

const FileModal = ({
  id, open, handleClose, onSave, idFan, row, mode, version
}) => {
  const classes = useStyles()
  const t = useT()
  const formRef = useRef(null)
  const dispatch = useCallback(useDispatch(), [])

  const [loader, setLoader] = useState(false)

  const modeView = useMemo(() => mode === 'view', [mode])

  const titleModal = useMemo(() => {
    switch (mode) {
      case 'view':
        return t('view of {this}', { this: t('archive', { howMany: 1 }) })
      case 'edit':
        return t('editing {this}', { this: t('archive', { howMany: 1 }) })
      default:
        return t('login image new file')
    }
  }, [mode, t])

  const onSuccessCallBack = useCallback(
    (data) => {
      onSave(data)
      setLoader(false)
      handleClose()
    },
    [handleClose, onSave]
  )

  const handleSubmit = useCallback(
    (values) => {
      dispatch(FanActions.uploadFileFan(
        { ...values, version },
        idFan,
        onSuccessCallBack
      ))
    },
    [dispatch, idFan, onSuccessCallBack, version]
  )

  const handleNameFile = useCallback(
    ({ name }) => {
      if (name) {
        const fileName = name.split('.')
        if (version > 0) {
          formRef.current.setFieldValue('filename', `${ fileName[0] } (${ version + 1 }).${ fileName[1] }`)
        } else {
          formRef.current.setFieldValue('filename', name)
        }
      }
    },
    [version]
  )

  useFormEffect(() => {
    if (!isEmpty(row)) {
      formRef.current.setData({ ...row, filename: row.file.filename })
    }
  }, [formRef, row])

  return (
    <Modal
      id={ id }
      open={ open }
      title={ titleModal }
      maxWidth="md"
      fullWidth
      escapeWhenLoading
      loading={ loader }
      FooterComponent={ () => (
        <ButtonContainer>
          {!modeView && (
            <I18n as={ Button }
              color="secondary"
              variant="outlined"
              onClick={ () => {
                handleClose()
                formRef.current.reset()
              } }
            >
              cancel
            </I18n>)}
          <Button
            color="secondary"
            variant="contained"
            onClick={ () => modeView ? handleClose() : formRef.current.submit() }
          >
            { modeView ? t('turn back') : t('save')}
          </Button>
        </ButtonContainer>
      ) }
    >
      <Form
        ref={ formRef }
        onSubmit={ handleSubmit }
        schemaConstructor={ attachmentsSchema }
        defaultValues={ INITIAL_VALUES }
      >
        <Grid container item sm={ 12 } spacing={ 1 } >
          <Grid item sm={ 12 } className={ classes.upload }>
            <UploadImage
              name="file"
              hideWhenHasValue
              types={ ['image/png', 'image/jpg', 'application/pdf'] }
              previewStyle={ { width: 200, height: 200 } }
              clearable={ !modeView }
              preview
              onValueChange={ handleNameFile }
            />
            <InputHidden name="path" />
            <InputHidden name="fileId" />
          </Grid>
          <Grid item sm={ 12 } md={ 12 }>
            <InputText
              name="filename"
              label={ t('filename') }
              disabled
            />
          </Grid>
          <Grid item sm={ 12 } md={ 12 }>
            <InputText
              name="description"
              label={ t('description', { howMany: 1 }) }
              disabled={ modeView }
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

FileModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  row: PropTypes.object,
  mode: PropTypes.string,
  idFan: PropTypes.number.isRequired,
  version: PropTypes.number.isRequired
}

FileModal.defaultProps = {
  onSave () {},
  row: {},
  mode: 'create'
}

export default FileModal
