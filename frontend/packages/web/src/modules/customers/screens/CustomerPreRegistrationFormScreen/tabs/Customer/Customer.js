import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'

import AdditionalInformation from './sections/AdditionalInformation'
import GeneralObservations from './sections/GeneralObservations'
import MainData from './sections/MainData'
import TaxInformation from './sections/TaxInformation'

const Customer = ({
  formRef, disabled, status, isEdit, handleDocumentation
}) => {
  const t = useT()

  return (
    <Grid container spacing={ 1 }>
      <CustomAccordion header={ t('main data') } handleInfo={ handleDocumentation }>
        <MainData formRef={ formRef } disabled={ disabled } status={ status } isEdit={ isEdit }/>
      </CustomAccordion>
      <CustomAccordion header={ t('additional information') } handleInfo={ handleDocumentation }>
        <AdditionalInformation formRef={ formRef } disabled={ disabled } />
      </CustomAccordion>
      <CustomAccordion header={ t('tax information') } handleInfo={ handleDocumentation }>
        <TaxInformation formRef={ formRef } disabled={ disabled } />
      </CustomAccordion>
      <CustomAccordion header={ t('general observations') } handleInfo={ handleDocumentation }>
        <GeneralObservations formRef={ formRef } disabled={ disabled } />
      </CustomAccordion>
    </Grid>
  )
}

Customer.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
  handleDocumentation: PropTypes.func.isRequired
}

export default Customer
