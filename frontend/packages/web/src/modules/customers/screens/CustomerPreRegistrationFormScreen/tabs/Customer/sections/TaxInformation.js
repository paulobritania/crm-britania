import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { Scope } from '@britania-crm/forms'
import { useT } from '@britania-crm/i18n'
import InputSelect from '@britania-crm/web-components/InputSelect'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

import useStyles from '../styles'

const TaxInformation = ({ disabled }) => {
  const t = useT()
  const classes = useStyles()

  const radioOptions = useMemo(
    () => [
      { id: true, name: t('yes') },
      { id: false, name: t('no') }
    ],
    [t]
  )

  const taxRegimeOptions = useMemo(
    () => [
      { id: 'Simples Nacional', name: 'Simples Nacional' },
      { id: 'Lucro Presumido/Parcial', name: 'Lucro Presumido/Parcial' },
      { id: 'Lucro Real', name: 'Lucro Real' },
      { id: 'Outros', name: 'Outros' }
    ],
    []
  )

  return (
    <Scope path="fiscalInformation">
      <Grid container spacing={ 1 } className={ classes.container }>
        <Grid item sm={ 12 } md={ 5 }>
          <RadioGroup
            name="specialTaxSubstitutionRegime"
            label={ t('special tax substitution regime') }
            readOnly={ disabled }
            options={ radioOptions }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 4 }>
          <RadioGroup
            name="clientFromMatoGrosso"
            label={ t('client from MG') }
            readOnly={ disabled }
            options={ radioOptions }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <InputSelect
            name="taxRegime"
            label={ t('tax regime') }
            options={ taxRegimeOptions }
            readOnly={ disabled }
          />
        </Grid>
      </Grid>
    </Scope>
  )
}

TaxInformation.propTypes = {
  // formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default TaxInformation
