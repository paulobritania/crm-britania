import React, {
  useRef,
  useCallback,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import attachmentsSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.attachments.schema'
import I18n, { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'
import UploadImage from '@britania-crm/web-components/UploadImage'

import useStyles, { ButtonContainer } from './styles'

const FormFileModal = ({
  id, open, handleClose, onSave, row, onEdit, mode
}) => {
  const classes = useStyles()
  const t = useT()
  const formRef = useRef(null)

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

  const handleSubmit = useCallback(
    (values) => {
      if (!isEmpty(row)) {
        onEdit(values)
      } else {
        onSave(values)
      }
      handleClose()
    },
    [handleClose, onEdit, onSave, row]
  )

  useFormEffect(() => {
    if (!isEmpty(row)) {
      formRef.current.setData({
        file: row?.file,
        description: row?.description,
        name: row?.name,
        path: row?.path
      })
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
            </I18n>
          )}
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
              types={ [
                'image/png',
                'image/jpg',
                'image/jpeg',
                'application/pdf',
                'application/vnd.ms-excel',
                'video/mp4',
                'text/plain',
                '.doc', '.docx',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                '.eml', '.pts', 'message/rfc822', 'message/partial', '.msg', 'msg'
              ] }
              previewStyle={ { width: 200, height: 200 } }
              clearable={ !modeView }
              preview
              title={ t('add the file') }
              description={ t('the {this} or', { gender: 'male', this: t('archive', { howMany: 3 }) }) }
            />
            <InputHidden name="path" />
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

FormFileModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  row: PropTypes.object,
  onEdit: PropTypes.func,
  mode: PropTypes.string
}

FormFileModal.defaultProps = {
  onSave () {},
  row: {},
  onEdit () {},
  mode: 'create'
}

export default FormFileModal
