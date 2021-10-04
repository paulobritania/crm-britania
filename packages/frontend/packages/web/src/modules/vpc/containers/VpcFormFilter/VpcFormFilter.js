import React, {
  forwardRef,
  useMemo,
  useCallback,
  useState
} from 'react'

import Grid from '@material-ui/core/Grid'

import vpcFilterSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.filter.schema'
import { useT } from '@britania-crm/i18n'
import {
  lines as linesCrmRoutes,
  users as usersCrmRoutes,
  customer as customerCrmRoutes,
  workflows as workflowsCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputDate from '@britania-crm/web-components/InputDate'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputMoney from '@britania-crm/web-components/InputMoney'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'

const VpcFormFilter = forwardRef((props, formRef) => {
  const t = useT()

  const [version, setVersion] = useState('')

  const {
    data: linesFromApi,
    loading: linesFromApiLoading
  } = useCrmApi(linesCrmRoutes.getAll, null, { revalidateOnFocus: false })

  const {
    data: regionalsFromApi,
    loading: regionalsFromApiLoading
  } = useCrmApi(usersCrmRoutes.regionalManager, null, { revalidateOnFocus: false })

  const { data: versionFromApi } = useCrmApi(workflowsCrmRoutes.getVersionVpc)
  const { data: taskWorkflowFromApi } = useCrmApi(version ? [workflowsCrmRoutes.getTasksUrl(version), version] : null)

  const pendingApprovalOptions = useMemo(() =>
    [
      { id: 'CONCLUDED', name: 'Concluídas' },
      { id: 'NOT_CONCLUDED', name: 'Não concluídas' }
    ],
  [])

  const foundsSituationOptions = useMemo(() =>
    [
      { id: 'CANCELED', name: 'Cancelada' },
      { id: 'TOTALLY_PAYED', name: 'Pago Total' },
      { id: 'PARTIALLY_PAYED', name: 'Pago Parcial' },
      { id: 'PENDING', name: 'Pendente' }
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

  const typeBudgetMock = useMemo(() =>
    [
      { id: 'EXTRA', name: 'EXTRA' },
      { id: 'NORMAL', name: 'NORMAL' },
      { id: 'CONTRATUAL', name: 'CONTRATUAL' }
    ],
  [])

  const onChangeVersion = useCallback(
    (value) =>
      setVersion(value)
    ,
    []
  )

  return (
    <Form
      ref={ formRef }
      { ...props }
      schemaConstructor={ vpcFilterSchema }
      defaultValues={ INITIAL_VALUES }
    >
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } md={ 4 }>
          <InputCpfCnpj
            label="CNPJ"
            name="cnpj"
            mode="cnpj"
          />
        </Grid>
        <Grid item xs={ 12 } md={ 4 }>
          <InputAutocomplete
            label={ t('matrix', { howMany: 1 }) }
            name="matrix"
            valueKey="parentCompanyName"
            paramName="parentCompany"
            params={ parentCompanyParams }
            url={ customerCrmRoutes.getInfoCustomer }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 4 }>
          <InputAutocomplete
            label={ t('code of {this}', { this: t('matrix') }) }
            name="codMatrix"
            valueKey="parentCompanyCode"
            paramName="parentCompanyCode"
            params={ parentCompanyParams }
            url={ customerCrmRoutes.getInfoCustomer }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputText
            label={ t('number budget') }
            name="numberBudget"
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            name="typeBudget"
            label={ t('type budget') }
            options={ typeBudgetMock }
            valueKey="name"
            loading={ false }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 6 }>
          <InputDateRange
            name="date"
            label={ t('date') }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            name="foundsSituation"
            label={ t('situation budget') }
            options={ foundsSituationOptions }
            valueKey="name"
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            name="line"
            label={ t('line') }
            options={ linesFromApi }
            idKey="lineCode"
            valueKey="lineDescription"
            loading={ linesFromApiLoading }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            name="regional"
            label="Regional"
            options={ regionalsFromApi }
            idKey="code"
            valueKey="description"
            loading={ regionalsFromApiLoading }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputDate
            label="SLA"
            name="sla"
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputMoney
            label={ t('min value') }
            name="minValue"
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputMoney
            label={ t('max value') }
            name="maxValue"
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            name="version"
            label={ t('version') }
            valueKey= "version"
            idKey="id"
            options={ versionFromApi }
            onValueChange={ onChangeVersion }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            options={ taskWorkflowFromApi }
            valueKey="title"
            label= { t('workflow task') }
            name="taskWorkflow"
            disabled={ !version }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputText
            label={ t('responsible task') }
            name="responsible"
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            clearable
            name="pendingApproval"
            label={ t('pending approval') }
            options={ pendingApprovalOptions }
            valueKey="name"
          />
        </Grid>
      </Grid>
    </Form>
  )
})

export default VpcFormFilter
