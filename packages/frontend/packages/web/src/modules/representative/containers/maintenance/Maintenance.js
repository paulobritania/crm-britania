import React, { useMemo } from 'react'

import { Scope } from '@unform/core'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import { representative } from '@britania-crm/services/apis/crmApi/resources/routes'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputPercentage from '@britania-crm/web-components/InputPercentage'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

import useStyles from '../styles'

const Maintenance = ({ disabled }) => {
  const t = useT()
  const classes = useStyles()

  const personTypeOptions = useMemo(() => [
    { id: 'física', name: 'Física' },
    { id: 'juridica', name: 'Jurídica' }
  ], [])

  const intermediatorOptions = useMemo(() => [{ id: true, name: t('intermediary') }], [t])

  return (
    <Grid container spacing={ 1 } className={ classes.containerMain } >
      <Scope path="maintenance">
        <Grid item sm={ 12 } md={ 3 }>
          <InputNumber
            name="representativeType"
            label={ t('representative type') }
            disabled={ disabled }
            maxLength={ 4 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputSelect
            name="personType"
            label={ t('type person') }
            options={ personTypeOptions }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputText
            name="country"
            label={ t('country') }
            disabled={ disabled }
            maxLength={ 21 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          {/* TODO: ajustar para a url correta e remover componente text */}
          <InputAutocomplete
            url={ representative.getRepresentativeList }
            paramName="name"
            valueKey="name"
            name="representativeGroup"
            label={ t('representative group') }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputText
            label={ t('payment schedule') }
            name="paymentCalendar"
            disabled={ disabled }
            maxLength={ 7 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputText
            label={ t('formula') }
            name="formula"
            disabled={ disabled }
            maxLength={ 13 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 6 }>
          <RadioGroup
            name="intermediator"
            options={ intermediatorOptions }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputNumber
            label={ t('ad generation carrier') }
            name="generationAdCarrier"
            disabled={ disabled }
            maxLength={ 5 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputPercentage
            label={ t('commission') }
            name="commissionPercentage"
            disabled={ disabled }
            maxLength={ 4 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputPercentage
            label={ t('with issuancer') }
            name="commissionEmissionPercentage"
            disabled={ disabled }
            maxLength={ 4 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputPercentage
            label={ t('minimum with') }
            name="minimumCommissionPercentage"
            disabled={ disabled }
            maxLength={ 4 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputPercentage
            label={ t('maximum with') }
            name="maximumCommissionPercentage"
            disabled={ disabled }
            maxLength={ 4 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputPercentage
            label={ t('manualCommission') }
            name="manualCommission"
            disabled={ disabled }
            maxLength={ 4 }
          />
        </Grid>
      </Scope>
    </Grid>
  )
}

Maintenance.propTypes = { disabled: PropTypes.bool.isRequired }

export default Maintenance
