import React, { useEffect, useState } from 'react'

import { useT } from '@britania-crm/i18n'

import useCrmApi from '@britania-crm/services/hooks/useCrmApi'

import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'

const ResponsibleInput = ({ index }) => {
  const t = useT()
  const [responsibleFromApiLoading, setResponsibleFromApiLoading] =
    useState(false)
  const [responsibleFromApi, setResponsibleFromApi] = useState([])
  const [responsible, setResponsible] = useState('')

  useCrmApi(
    [
      customerCrmRoutes.getResponsible.replace(
        ':clientCode',
        1049,
        listByLineOfFamily
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
      revalidateOnFocus: false,
      onSuccess(data) {
        console.log(data)
        setResponsibleFromApi(data)
        setResponsibleFromApiLoading(false)
      },
      onErrorRetry(error) {
        if (error.response.status === 500) {
          snackbar.error(getErrorMessage(error))
        }
      }
    }
  )

  const handleResponsibleChange = (evt) => {
    setFamily(evt.target.value)
  }

  return (
    <InputSelect
      detached
      valueKey='approverDescription'
      disabled={isDisabled || isEmpty(familiesFromApi)}
      onChange={handleResponsibleChange(index)}
      name='responsible'
      label={t('responsible', { howMany: 1 })}
      value={responsible}
      id='select-responsible'
      loading={responsibleFromApiLoading}
      required
      options={responsibleFromApi}
    />
  )
}

export default ResponsibleInput
