import React, {
  useCallback,
  useRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import I18n, { useT } from '@britania-crm/i18n'
import { clients as clientsCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import Modal from '@britania-crm/web-components/Modal'

const PreRegistrationCfopModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSubmit,
    title,
    schema,
    defaultValues,
    disabled
  } = props

  const t = useT()
  const formRef = useRef(null)
  const rows = useMemo(
    () => {
      const arrayNames = map(defaultValues, (_, name) => name)

      const groups = []
      for (let i = 0; i < arrayNames.length; i = i + 2) {
        groups.push({ codeName: arrayNames[i], descriptionName: arrayNames[i + 1] })
      }
      return groups
    },
    [defaultValues]
  )

  const handleSubmit = useCallback(
    (values) => {
      onSubmit(values)
      handleClose()
    },
    [handleClose, onSubmit]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="md"
      title={ title }
      variant="space"
      fullWidth
      FooterComponent={ () => (
        <>
          <Button
            onClick={ handleClose }
            color="secondary"
            variant="outlined"
          >
            {disabled ? t('turn back') : t('cancel')}
          </Button>
          {
            !disabled && (
              <I18n as={ Button }
                onClick={ () => formRef.current.submit() }
                color="secondary"
                style={ { marginLeft: 10 } }
              >
            save
              </I18n>
            )
          }
        </>
      )
      }
    >
      <Form
        ref={ formRef }
        schemaConstructor={ schema }
        defaultValues={ defaultValues }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 2 }>
          {map(rows, (row) => (
            <Grid key={ row.codeName } item sm={ 12 } md={ 6 }>
              <Grid container spacing={ 1 }>
                <Grid item sm={ 12 }>
                  <I18n as={ Typography }>
                    {`cfop ${ row.codeName }` || ''}
                  </I18n>
                </Grid>

                {row.codeName && (
                  <Grid item sm={ 12 } md={ 4 }>
                    <InputAutocomplete
                      url={ clientsCrmRoutes.getOperationNature }
                      params={ {
                        page: 1,
                        pageSize: 10
                      }
                      }
                      valueKey="code"
                      paramName="code"
                      name={ row.codeName }
                      label={ t('code', { howMany: 1 }) }
                      disabled={ disabled }
                      onValueChange={ (value) => {
                        if (value?.description) {
                          formRef.current.setFieldValue(row.descriptionName, value)
                        }
                      } }
                    />
                  </Grid>
                )}

                {row.descriptionName && (
                  <Grid item sm={ 12 } md={ 8 }>
                    <InputAutocomplete
                      url={ clientsCrmRoutes.getOperationNature }
                      params={ {
                        page: 1,
                        pageSize: 10
                      }
                      }
                      valueKey="description"
                      paramName="description"
                      name={ row.descriptionName }
                      label={ t('description') }
                      disabled={ disabled }
                      onValueChange={ (value) => {
                        if (value?.code) {
                          formRef.current.setFieldValue(row.codeName, value)
                        }
                      } }
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Form>
    </Modal>
  )
}

PreRegistrationCfopModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  schema: PropTypes.func.isRequired,
  defaultValues: PropTypes.object.isRequired,
  disabled: PropTypes.bool
}

PreRegistrationCfopModal.defaultProps = { disabled: false }

export default PreRegistrationCfopModal
