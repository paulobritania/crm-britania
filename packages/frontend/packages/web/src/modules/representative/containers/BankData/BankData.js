import React, { useMemo } from 'react'

import { Scope } from '@unform/core'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import { bank as bankCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputNumber from '@britania-crm/web-components/InputNumber'

import useStyles from '../styles'

const BankData = ({ disabled }) => {
  const t = useT()
  const classes = useStyles()

  const banckParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10
    }),
    [])

  return (
    <Grid container spacing={ 1 } className={ classes.containerMain } >
      <Scope path="bankData">
        <Grid item sm={ 12 } md={ 4 }>
          <InputAutocomplete
            name="code"
            label={ t('bank') }
            url={ bankCrmRoutes.getAll }
            params={ banckParams }
            normalizeDataFn={ (options) => map(options, ({ code, description }) => ({
              code, description, label: `${ code } - ${ description }`
            })) }
            valueKey="label"
            paramName="description"
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputNumber
            name="agency"
            label={ t('agency', { howMany: 1 }) }
            disabled={ disabled }
            maxLength={ 8 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputNumber
            name="account"
            label={ t('account', { howMany: 1 }) }
            disabled={ disabled }
            maxLength={ 21 }
          />
        </Grid>
      </Scope>
    </Grid>
  )
}

BankData.propTypes = { disabled: PropTypes.bool.isRequired }

export default BankData
