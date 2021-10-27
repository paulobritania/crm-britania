import React, { forwardRef, useMemo } from 'react'

import Grid from '@material-ui/core/Grid'

import buyerFilterSchema, {
  INITIAL_VALUES
} from '@britania-crm/forms/schemas/buyer/buyer.filter.schema'
import { useT } from '@britania-crm/i18n'
import { lines as linesCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Form from '@britania-crm/web-components/Form'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'

const BuyerFormFilter = forwardRef((props, formRef) => {
  const t = useT()

  const {
    data: linesFromApi,
    loading,
    error
  } = useCrmApi(linesCrmRoutes.getAll, null, { revalidateOnFocus: false })

  return (
    <Form
      ref={formRef}
      {...props}
      schemaConstructor={buyerFilterSchema}
      defaultValues={INITIAL_VALUES}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputSelect
            clearable
            name='lineDescription'
            label={t('allLines')}
            idKey='lineCode'
            valueKey='lineDescription'
            options={linesFromApi}
            loading={loading || !!error}
            multiple
          />
        </Grid>
      </Grid>
    </Form>
  )
})

export default BuyerFormFilter
