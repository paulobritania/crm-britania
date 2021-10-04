import React, {
  forwardRef,
  useMemo
} from 'react'

import Grid from '@material-ui/core/Grid'

import equalizationFilterSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/equalization/equalization.filter.schema'
import { useT } from '@britania-crm/i18n'
import { clients as clientsRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputSelect from '@britania-crm/web-components/InputSelect'

const EqualizationFormFilter = forwardRef((props, formRef) => {
  const t = useT()

  const originMock = useMemo(() =>
    [
      { id: 0, name: 'Britânia' },
      { id: 1, name: 'Philco' },
      { id: 2, name: 'Ambas' }
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

  return (
    <Form
      ref={ formRef }
      { ...props }
      schemaConstructor={ equalizationFilterSchema }
      defaultValues={ INITIAL_VALUES }
    >
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            name="origin"
            label={ t('establishment') }
            options={ originMock }
            valueKey="name"
            loading={ false }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputAutocomplete
            name="destination"
            label={ t('destination') }
            url={ clientsRoutes.get }
            valueKey="parentCompany"
            paramName="parentCompany"
            params={ parentCompanyParams }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputAutocomplete
            name="client"
            label={ t('client', { howMany: 1 }) }
            url={ clientsRoutes.get }
            valueKey="parentCompany"
            paramName="parentCompany"
            params={ parentCompanyParams }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputAutocomplete
            name="product"
            label={ t('product', { howMany: 1 }) }
            url={ clientsRoutes.get }
            valueKey="parentCompany"
            paramName="parentCompany"
            params={ parentCompanyParams }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 5 }>
          <InputDateRange
            name="date"
            label={ t('date') }
          />
        </Grid>

      </Grid>
    </Form>
  )
})

export default EqualizationFormFilter
