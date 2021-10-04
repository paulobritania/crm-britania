import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'

import CommissionPercentage from '../../containers/commissionPercentage'
import Financial from '../../containers/financial'
import Maintenance from '../../containers/maintenance'
import useStyles from './styles'

const CustomerForm = ({
  disabled, formRef, commissionPercentageFromApi
}) => {
  const t = useT()
  const classes = useStyles()

  return (
    <Grid container spacing={ 1 } className={ classes.container } >
      <Grid item xs={ 12 }>
        <CustomAccordion header={ t('financial') } >
          <Financial disabled={ disabled } formRef={ formRef }/>
        </CustomAccordion>
        <CustomAccordion header={ t('maintenance') } >
          <Maintenance disabled={ disabled }/>
        </CustomAccordion>
        <CustomAccordion header={ t('commission percentage') } >
          <CommissionPercentage formRef={ formRef } disabled={ disabled } commissionPercentageFromApi={ commissionPercentageFromApi }/>
        </CustomAccordion>
      </Grid>
    </Grid>
  )
}

CustomerForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  commissionPercentageFromApi: PropTypes.array
}

CustomerForm.defaultProps = { commissionPercentageFromApi: [] }

export default CustomerForm
