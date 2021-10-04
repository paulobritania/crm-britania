import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { Scope } from '@britania-crm/forms'
import { useT } from '@britania-crm/i18n'
import InputSelect from '@britania-crm/web-components/InputSelect'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

const CadastralCheck = ({ disabled }) => {
  const t = useT()

  const radioOptions = useMemo(() => [
    { id: true, name: 'Sim' },
    { id: false, name: 'Não' }
  ], [])

  const selectOptions = useMemo(() => [
    { id: 'A', name: 'A' },
    { id: 'B', name: 'B' },
    { id: 'C', name: 'C' },
    { id: 'D', name: 'D' }
  ], [])

  return (
    <Scope path="cadastralCheck">
      <Grid container spacing={ 1 } style={ { marginTop: 10 } }>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            label={ t('cadastral check') }
            name="cadastralCheck"
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            label={ t('new customer') }
            name="newClient"
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          {/* TODO: CORRIGIR NÃO VALIDAÇÃO E ACRESCENTAR EXIBIÇÃO DE LABEL */}
          <InputSelect
            id="riskClass"
            name="riskClass"
            label={ t('risk class') }
            options={ selectOptions }
            disabled={ disabled }
          />
        </Grid>
      </Grid>
    </Scope>
  )
}

CadastralCheck.propTypes = {
  // formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default CadastralCheck
