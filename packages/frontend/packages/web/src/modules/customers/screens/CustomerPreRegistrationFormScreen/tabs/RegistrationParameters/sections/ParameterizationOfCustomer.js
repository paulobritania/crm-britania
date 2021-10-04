import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { Scope } from '@britania-crm/forms'
import { useT } from '@britania-crm/i18n'
import { clients as clientsCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Checkbox from '@britania-crm/web-components/Checkbox'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import TextArea from '@britania-crm/web-components/TextArea'

const ParameterizationOfCustomer = ({ disabled }) => {
  const t = useT()

  const {
    data: clientsFromApi,
    loading: clientsFromApiLoading
  } = useCrmApi(clientsCrmRoutes.getGroups)

  return (
    <Scope path="parametrization">
      <Grid container spacing={ 1 } style={ { marginTop: 10 } }>
        <Grid item sm={ 12 } md={ 2 }>
          <InputSelect
            name="clientGroupCode"
            label={ t('customer group') }
            idKey="codeClientGroup"
            valueKey="nameClientGroup"
            loading={ clientsFromApiLoading }
            options={ clientsFromApi }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 5 }>
          <InputText
            name="shortName"
            label={ t('short name') }
            disabled={ disabled }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 5 }>
          <InputText
            name="parentCompany"
            label={ t('matrix') }
            disabled={ disabled }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 10 }>
          <TextArea
            name="historic"
            label={ t('historic') }
            disabled={ disabled }
            rows={ 3 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 2 }>
          <Checkbox
            label={ t('intermediary') }
            name="intermediary"
          />
        </Grid>
      </Grid>
    </Scope>
  )
}

ParameterizationOfCustomer.propTypes = {
  // formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default ParameterizationOfCustomer
