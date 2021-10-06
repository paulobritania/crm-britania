import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'

import CadastralCheck from './sections/CadastralCheck'
import Financial from './sections/Financial'
import ParameterizationOfCustomer from './sections/ParameterizationOfCustomer'
import PriceTable from './sections/PriceTable'

const RegistrationParameters = ({
  formRef, disabled, handleDocumentation
}) => {
  const t = useT()

  return (
    <Grid container spacing={ 1 }>
      <CustomAccordion header={ t('financial') } handleInfo={ handleDocumentation }>
        <Financial disabled={ disabled } formRef={ formRef } />
      </CustomAccordion>
      <CustomAccordion header={ t('cadastral check') } handleInfo={ handleDocumentation }>
        <CadastralCheck disabled={ disabled } formRef={ formRef } />
      </CustomAccordion>
      <CustomAccordion header={ t('parameterization of customer') } handleInfo={ handleDocumentation }>
        <ParameterizationOfCustomer disabled={ disabled } formRef={ formRef } />
      </CustomAccordion>
      <CustomAccordion header={ t('price table') } handleInfo={ handleDocumentation }>
        <PriceTable disabled={ disabled } formRef={ formRef } />
      </CustomAccordion>
    </Grid>
  )
}

RegistrationParameters.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleDocumentation: PropTypes.func.isRequired
}

export default RegistrationParameters
