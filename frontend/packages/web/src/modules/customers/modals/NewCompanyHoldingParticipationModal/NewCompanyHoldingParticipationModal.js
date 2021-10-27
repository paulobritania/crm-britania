import React, {
  useCallback,
  useRef,
  useState,
  useEffect
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import companyHoldingParticipationSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.companyHoldingParticipation.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { searchStates } from '@britania-crm/services/apis/ibgeApi'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputPercentage from '@britania-crm/web-components/InputPercentage'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'

const NewCompanyHoldingParticipationModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSubmit,
    participation
  } = props

  const t = useT()
  const formRef = useRef(null)

  const [stateOptions, setStateOptions] = useState([])

  const getStateOptions = useCallback(
    async () => {
      const states = await searchStates()
      setStateOptions(states)
    },
    []
  )

  const handleSubmit = useCallback(
    (values) => {
      onSubmit({
        ...values,
        participationPercent: Number(values.participationPercent)
      })
      handleClose()
    },
    [handleClose, onSubmit]
  )

  useFormEffect(
    () => {
      if (!isEmpty(participation)) {
        formRef.current.setData(participation)
      }
    },
    [participation]
  )

  useEffect(
    () => {
      getStateOptions()
    },
    [getStateOptions]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="md"
      title={ t('companies holding participation') }
      variant="space"
      fullWidth
      FooterComponent={ () => (
        <>
          <I18n as={ Button }
            onClick={ handleClose }
            color="secondary"
            variant="outlined"
          >
            cancel
          </I18n>
          <I18n as={ Button }
            onClick={ () => formRef.current.submit() }
            color="secondary"
            style={ { marginLeft: 10 } }
          >
            save
          </I18n>
        </>
      ) }
    >
      <Form
        ref={ formRef }
        schemaConstructor={ companyHoldingParticipationSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 } md={ 8 }>
            <InputText
              name="name"
              label={ t('company name') }
            />
          </Grid>

          <Grid item xs={ 12 } md={ 1 }>
            <InputSelect
              name="state"
              label="UF"
              valueKey="sigla"
              idKey="sigla"
              options={ stateOptions }
            />
          </Grid>

          <Grid item xs={ 12 } md={ 3 }>
            <InputText
              name="city"
              label={ t('city', { howMany: 1 }) }
            />
          </Grid>

          <Grid item xs={ 12 } md={ 6 }>
            <InputText
              name="branch"
              label={ t('activity branch', { howMany: 1 }) }
            />
          </Grid>

          <Grid item xs={ 12 } md={ 3 }>
            <InputPercentage
              name="participationPercent"
              label={ t('participation', { howMany: 1 }) }
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

NewCompanyHoldingParticipationModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  participation: PropTypes.object
}

NewCompanyHoldingParticipationModal.defaultProps = { participation: {} }

export default NewCompanyHoldingParticipationModal
