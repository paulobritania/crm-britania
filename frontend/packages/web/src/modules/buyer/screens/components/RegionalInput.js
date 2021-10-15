import React, { useState, forwardRef } from 'react'

import useCrmApi from '@britania-crm/services/hooks/useCrmApi'

import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'

const RegionalInput = forwardRef((props, ref) => {
  const { index } = props
  const t = useT()
  const [regionalFromApiLoading, setRegionalFromApiLoading] = useState(false)
  const [regionalFromApi, setRegionalFromApi] = useState([])
  const [regional, setRegional] = useState('')

  useCrmApi(
    [
      customerCrmRoutes.getRegional.replace(
        ':clientCode',
        1049,
        linesAndFamilies
      ),
      {
        page: 1,
        pageSize: 10,
        linesAndFamilies
      }
    ],
    {
      params: {
        page: 1,
        pageSize: 10,
        linesAndFamilies
      }
    },
    {
      onSuccess(data) {
        console.log(data)
        setRegionalFromApi(data)
        setRegionalFromApiLoading(false)
      },
      onErrorRetry(error) {
        if (error.response.status === 500) {
          snackbar.error(getErrorMessage(error))
        }
      },
      revalidateOnFocus: false
    }
  )

  const handleRegionalChange = (evt) => {
    setFamily(evt.target.value)
  }

  return (
    <InputSelect
      detached
      valueKey='approverDescription'
      disabled={isDisabled || isEmpty(regionalFromApi)}
      onChange={handleRegionalChange(index)}
      name='regionalManager'
      label={t('regional manager')}
      id='select-regional'
      value={regional}
      loading={regionalFromApiLoading}
      required
      options={regionalFromApi}
    />
  )
})

export default RegionalInput
