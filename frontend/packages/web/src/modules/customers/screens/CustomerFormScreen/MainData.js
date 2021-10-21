import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputText from '@britania-crm/web-components/InputText'
import WorkFlowExecution from '@britania-crm/web-src/modules/workflow/containers/WorkFlowExecution'

import useStyles from './styles'

const MainData = ({
  isDisabled, handleDocumentation, hasPermission, workflowTaskInProgress, id, status
}) => {
  const t = useT()
  const classes = useStyles()

  return (
    <CustomAccordion header={ t('main data') } handleInfo={ handleDocumentation }>
      <Grid container item spacing={ 1 } sm={ 12 } className={ classes.containerMain }>
        <Grid item sm={ 12 } md={ 3 } >
          <InputText
            name="parentCompanyCode"
            label={ t('code of matrix', { abbreviation: false }) }
            disabled={ true }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 6 }>
          <InputText
            name="parentCompanyName"
            label={ t('matrix', { howMany: 1 }) }
            disabled={ true }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputCpfCnpj
            name="cnpj"
            mode="cnpj"
            label="CNPJ"
            disabled={ true }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 6 }>
          <InputText
            name="socialReason"
            label={ t('company name', { howMany: 1 }) }
            disabled={ true }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 6 }>
          <InputText
            name="branches"
            label={ t('branch', { howMany: 1 }) }
            disabled={ true }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputPhone
            name="commercialPhone"
            label={ t('commercial {this}', { this: t('phone', { howMany: 1 }) }) }
            disabled={ isDisabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputPhone
            name="cellPhone"
            label={ t('cell {this}', { this: t('phone', { howMany: 1 }) }) }
            disabled={ isDisabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputText
            name="logisticsInformation"
            label={ t('logistical information', { abbreviation: false }) }
            disabled={ isDisabled }
            maxLength={ 41 }
            touchOnChange
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputText
            name="creditSituation"
            label={ t('credit status', { abbreviation: false }) }
            disabled={ isDisabled }
            maxLength={ 41 }
            touchOnChange
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="regimeLetter"
            label={ t('letter of regime', { abbreviation: false }) }
            disabled={ isDisabled }
            maxLength={ 41 }
            touchOnChange
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputNumber
            name="daysWithoutBilling"
            label={ t('days without billing', { abbreviation: false }) }
            disabled={ isDisabled }
            maxLength={ 4 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="customerRanking"
            label={ t('{this} ranking', { gender: 'male', this: t('customer', { howMany: 1 }) }) }
            disabled={ true }
          />
        </Grid>
        <Grid item sm={ 12 } className={ classes.status }>
          {status}
        </Grid>
        {hasPermission && (
          <Grid item sm={ 12 }>
            <WorkFlowExecution
              baseUrl={ `${ customerCrmRoutes.getOne }/ ${ id }` }
              taskInProgress={ workflowTaskInProgress }
            />
          </Grid>
        )}
      </Grid>
    </CustomAccordion>
  )
}

MainData.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  handleDocumentation: PropTypes.func,
  hasPermission: PropTypes.bool,
  workflowTaskInProgress: PropTypes.object,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  status: PropTypes.any
}

MainData.defaultProps = {
  handleDocumentation () {},
  workflowTaskInProgress: {},
  id: '',
  hasPermission: false,
  status: null
}

export default MainData
