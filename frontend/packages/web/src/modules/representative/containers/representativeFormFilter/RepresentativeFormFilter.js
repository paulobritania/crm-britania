import React, { forwardRef } from 'react'

import Grid from '@material-ui/core/Grid'

import representativeFilterSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/representative/representative.filter.schema'
import { useT } from '@britania-crm/i18n'
import Form from '@britania-crm/web-components/Form'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'

const RepresentativeFormFilter = forwardRef((props, formRef) => {
  const t = useT()

  const mockStatus = [
    { id: 'OPEN', name: 'Em Aberto' },
    { id: 'CONCLUDED', name: 'Concluído' },
    { id: 'CANCELED', name: 'Cancelado' },
    { id: 'WORK_IN_PROGRESS', name: 'Fluxo de tarefas em andamento' }
  ]

  return (
    <Form
      ref={ formRef }
      { ...props }
      schemaConstructor={ representativeFilterSchema }
      defaultValues={ INITIAL_VALUES }
    >
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } md={ 4 }>
          <InputCpfCnpj
            name="cnpj"
            label="CNPJ"
          />
        </Grid>
        <Grid item xs={ 12 } md={ 4 }>
          <InputText
            name="companyName"
            label={ t('company name') }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 4 }>
          <InputSelect
            name="status"
            label={ t('status') }
            valueKey="name"
            idKey= "id"
            options={ mockStatus }
          />
        </Grid>
      </Grid>
    </Form>
  )
})

export default RepresentativeFormFilter
