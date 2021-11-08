import React, { forwardRef, useState } from 'react'

import Grid from '@material-ui/core/Grid'

import buyerFilterSchema, {
  INITIAL_VALUES
} from '@britania-crm/forms/schemas/buyer/buyer.filter.schema'
import { useT } from '@britania-crm/i18n'
import { lines as linesCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Form from '@britania-crm/web-components/Form'
import InputSelect from '@britania-crm/web-components/InputSelect'

const BuyerFormFilter = forwardRef((props, formRef) => {
  const t = useT()
  const [selected, setSelected] = useState([])

  const {
    data: linesFromApi,
    loading,
    error
  } = useCrmApi(linesCrmRoutes.getAll, null, { revalidateOnFocus: false })

  const handleChange = (target) => {
    setSelected(target.value)
    formRef.current.setFieldValue('lineDescription', target.value)
  }

  const handleClick = (target) => {
    if (target.value == null && selected) formRef.current.submit()
  }

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
            style={{ maxWidth: 120 }}
            name='lineDescription'
            label={t('allLines')}
            idKey='lineCode'
            valueKey='lineDescription'
            value={selected}
            options={linesFromApi}
            loading={loading || !!error}
            id='select-line-description'
            multiple
            onChange={({ target }) => handleChange}
            onClick={({ target }) => handleClick(target)}
          />
        </Grid>
      </Grid>
    </Form>
  )
})

export default BuyerFormFilter
