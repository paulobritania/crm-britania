import React, {
  forwardRef,
  useMemo,
  useState
} from 'react'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import reportVpcFilterSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/reportVpc/reportVpc.filter.schema'
import { useT } from '@britania-crm/i18n'
import {
  clients as clientsCrmRoutes,
  users as usersCrmRoutes,
  lines as linesCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputSelect from '@britania-crm/web-components/InputSelect'

const ReportVpcFormFilter = forwardRef((props, formRef) => {
  const t = useT()

  const [line, setLine] = useState([])
  const [matrix, setMatrix] = useState({})

  const { data: linesFromApi } = useCrmApi(linesCrmRoutes.getAll)

  const clientParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      clientRegistrationType: 'REGISTER'
    }),
    []
  )

  const regionalParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      lineCodes: line,
      clientCode: matrix.parentCompanyCode
    })
    , [line, matrix])

  return (
    <Form
      ref={ formRef }
      { ...props }
      schemaConstructor={ reportVpcFilterSchema }
      defaultValues={ INITIAL_VALUES }
    >
      <Grid container spacing={ 1 }>
        <Grid item sm={ 12 } md={ 4 } >
          <InputSelect
            idKey="lineCode"
            valueKey="lineDescription"
            name="line"
            value={ line }
            label={ t('line', { howMany: 1 }) }
            options={ linesFromApi }
            onValueChange={ setLine }
            multiple
          />
        </Grid>
        <Grid item xs={ 12 } md={ 4 }>
          <InputAutocomplete
            url={ clientsCrmRoutes.get }
            params={ clientParams }
            valueKey="parentCompany"
            paramName="parentCompany"
            name="matrix"
            label={ t('matrix', { howMany: 1 }) }
            onValueChange={ setMatrix }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 } >
          <InputAutocomplete
            url={ usersCrmRoutes.getRegional }
            params={ regionalParams }
            valueKey="approverCode"
            paramName="approverDescription"
            name="regional"
            label={ t('regional manager') }
            disabled={ isEmpty(matrix) && isEmpty(line) }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 4 }>
          <InputAutocomplete
            url={ usersCrmRoutes.autoComplete }
            valueKey="name"
            paramName="name"
            name="responsibleForService"
            label={ t('responsible', { howMany: 1 }) }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 8 }>
          <InputDateRange
            name="date"
          />
        </Grid>
      </Grid>
    </Form>
  )
})

export default ReportVpcFormFilter
