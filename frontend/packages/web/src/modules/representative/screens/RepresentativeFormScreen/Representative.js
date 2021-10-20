import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'

import BankData from '../../containers/BankData'
import Documentation from '../../containers/Documentation'
import MainData from '../../containers/mainData'
import useStyles from './styles'

const Representative = ({
  getFieldAddress,
  setCurrentState,
  currentState,
  disabled,
  stateOptions,
  formRef
}) => {
  const t = useT()
  const classes = useStyles()

  return (
    <Grid container spacing={ 1 } className={ classes.container } >
      <CustomAccordion header={ t('main data') } >
        <MainData
          getFieldAddress={ getFieldAddress }
          setCurrentState={ setCurrentState }
          state={ currentState }
          disabled={ disabled }
          stateOptions={ stateOptions }
          formRef={ formRef }
        />
      </CustomAccordion>
      <CustomAccordion header={ t('bank data') } >
        <BankData disabled={ disabled } />
      </CustomAccordion>
      <CustomAccordion header={ t('documentation', { howMany: 1 }) } >
        <Documentation disabled={ disabled } formRef={ formRef } />
      </CustomAccordion>
    </Grid>
  )
}

Representative.propTypes = {
  setCurrentState: PropTypes.func.isRequired,
  currentState: PropTypes.string.isRequired,
  getFieldAddress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  stateOptions: PropTypes.array.isRequired,
  formRef: PropTypes.any.isRequired
}

export default Representative
