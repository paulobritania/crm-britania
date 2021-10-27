import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { Scope } from '@britania-crm/forms'
import { useT } from '@britania-crm/i18n'
import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'

import useStyles from '../styles'

const PriceTable = ({ disabled }) => {
  const t = useT()
  const classes = useStyles()

  const priceListParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10
    }),
    [])

  return (
    <Scope path="priceList">
      {/* TODO: Aguardando resposta do cliente para ver o funcionamento dos campos */}
      <Grid container spacing={ 1 }>
        <Grid item sm={ 12 } md={ 4 }>
          <Typography className={ classes.heading }>
            { t('base {first} establishment {second}', { first: '1', second: '128 CD/ES' }) }
          </Typography>
          <InputAutocomplete
            url={ customerCrmRoutes.getPriceList }
            params={ priceListParams }
            valueKey="codePriceList"
            paramName="codePriceList"
            name="establishment128CdEsCode"
            label={ t('code') }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ false } md={ 2 } />

        <Grid item sm={ 12 } md={ 4 }>
          <Typography className={ classes.heading }>
            { t('base {first} establishment {second}', { first: '1', second: '22' }) }
          </Typography>
          <InputAutocomplete
            url={ customerCrmRoutes.getPriceList }
            params={ priceListParams }
            valueKey="codePriceList"
            paramName="codePriceList"
            name="establishment22Code"
            label={ t('code') }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ false } md={ 2 } />

        <Grid item sm={ 12 } md={ 4 }>
          <Typography className={ classes.heading }>
            { t('base {first} establishment {second}', { first: '15', second: '15' }) }
          </Typography>
          <InputAutocomplete
            url={ customerCrmRoutes.getPriceList }
            params={ priceListParams }
            valueKey="codePriceList"
            paramName="codePriceList"
            name="establishment15Code"
            label={ t('code') }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ false } md={ 2 } />

        <Grid item sm={ 12 } md={ 4 }>
          <Typography className={ classes.heading }>
            { t('base {first} establishment {second}', { first: '30', second: '31 Manaus' }) }
          </Typography>
          <InputAutocomplete
            url={ customerCrmRoutes.getPriceList }
            params={ priceListParams }
            valueKey="codePriceList"
            paramName="codePriceList"
            name="establishment31ManausCode"
            label={ t('code') }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ false } md={ 2 } />

        <Grid item sm={ 12 } md={ 4 }>
          <Typography className={ classes.heading }>
            { t('base {first} establishment {second}', { first: '30', second: '31 AG/SC' }) }
          </Typography>
          <InputAutocomplete
            url={ customerCrmRoutes.getPriceList }
            params={ priceListParams }
            valueKey="codePriceList"
            paramName="codePriceList"
            name="establishment31AgScCode"
            label={ t('code') }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ false } md={ 2 } />

        <Grid item sm={ 12 } md={ 4 }>
          <Typography className={ classes.heading }>
            { t('base {first} establishment {second}', { first: '30', second: '31 AG/SP' }) }
          </Typography>
          <InputAutocomplete
            url={ customerCrmRoutes.getPriceList }
            params={ priceListParams }
            valueKey="codePriceList"
            paramName="codePriceList"
            name="establishment31AgSpCode"
            label={ t('code') }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ false } md={ 2 } />

        <Grid item sm={ 12 } md={ 4 }>
          <Typography className={ classes.heading }>
            { t('base {first} establishment {second}', { first: '30', second: '305 CD/PE' }) }
          </Typography>
          <InputAutocomplete
            url={ customerCrmRoutes.getPriceList }
            params={ priceListParams }
            valueKey="codePriceList"
            paramName="codePriceList"
            name="establishment305CdPe"
            label={ t('code') }
            disabled={ disabled }
          />
        </Grid>
      </Grid>
    </Scope>
  )
}

PriceTable.propTypes = {
  // formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default PriceTable
