import React, {
  forwardRef,
  useMemo,
  useState
} from 'react'

import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import fanFilterSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/fan/fan.filter.schema'
import { useT } from '@britania-crm/i18n'
import {
  clients as clientsRoutes,
  representative as representativeRoutes,
  fan as fanRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputSelect from '@britania-crm/web-components/InputSelect'

const FanFormFilter = forwardRef((props, formRef) => {
  const t = useT()

  const [numberFan, setNumberFan] = useState('')

  const numberParams = useMemo(
    () => (
      { number: numberFan.number }
    ),
    [numberFan]
  )

  const COMPANY = useMemo(() =>
    [
      { id: 'BRITÂNIA', name: 'Britânia' },
      { id: 'PHILCO', name: 'Philco' },
      { id: 'AMBAS', name: 'Ambas' }
    ],
  [])

  const parentCompanyParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      clientRegistrationType: 'REGISTER'
    }),
    []
  )

  const responsibleParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      clientRegistrationType: 'REGISTER'
    }),
    []
  )

  return (
    <Form
      ref={ formRef }
      { ...props }
      schemaConstructor={ fanFilterSchema }
      defaultValues={ INITIAL_VALUES }
    >
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } md={ 3 }>
          <InputAutocomplete
            url={ fanRoutes.getNumbersFan }
            params={ numberParams }
            valueKey="number"
            paramName="number"
            label={ t('number fan') }
            name="number"
            onValueChange={ setNumberFan }
            normalizeDataFn={ (options) => map(options, (number) => ({ number })) }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            name="company"
            label={ t('company') }
            idKey="id"
            options={ COMPANY }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 6 }>
          <InputAutocomplete
            name="parentCompanyName"
            label={ t('matrix') }
            url={ clientsRoutes.get }
            valueKey="parentCompany"
            paramName="parentCompany"
            params={ parentCompanyParams }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputAutocomplete
            label={ t('responsible', { howMany: 1 }) }
            name="representative"
            url={ representativeRoutes.getRepresentativeList }
            valueKey="name"
            paramName="name"
            params={ responsibleParams }
          />
        </Grid>
      </Grid>
    </Form>
  )
})

export default FanFormFilter
