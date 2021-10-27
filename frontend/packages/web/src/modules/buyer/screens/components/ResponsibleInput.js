import React, { forwardRef } from 'react'

import isEmpty from 'lodash/isEmpty'

import { useT } from '@britania-crm/i18n'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useLinesBuyers } from '@britania-crm/services/hooks/useLinesBuyers'
import { useSnackbar } from '@britania-crm/snackbar'

import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import InputSelect from '@britania-crm/web-components/InputSelect'

const ResponsibleInput = forwardRef((props, ref) => {
  const { index, matrixCode, formRef } = props
  const t = useT()
  const snackbar = useSnackbar()
  const {
    linesBuyers,
    handleLineChange,
    responsibleFromApi,
    handleArrayResponsible
  } = useLinesBuyers()
  const line = linesBuyers[index].lineCode
  const family = linesBuyers[index].familyCode

  const { loading: responsibleFromApiLoading } = useCrmApi(
    matrixCode && !!family && isEmpty(responsibleFromApi[index])
      ? [
          customerCrmRoutes.getResponsible.replace(':clientCode', matrixCode, [
            `${line},${family}`
          ]),
          {
            page: 1,
            pageSize: 10,
            linesAndFamilies: [`${line},${family}`]
          }
        ]
      : null,
    {
      params: {
        page: 1,
        pageSize: 10,
        linesAndFamilies: [`${line},${family}`]
      }
    },
    {
      onSuccess(data) {
        handleArrayResponsible(index, data)

        formRef.current.setFieldValue('responsible', first(data))
      },
      onErrorRetry(error) {
        if (error.response.status === 500) {
          snackbar.error(getErrorMessage(error))
        }
      },
      revalidateOnFocus: false
    }
  )

  return (
    <InputSelect
      ref={ref}
      detached
      valueKey='approverDescription'
      idKey='approverCode'
      disabled={isEmpty(responsibleFromApi[index])}
      onChange={(e) => handleLineChange(index, e, formRef)}
      name='responsible'
      label={t('responsible', { howMany: 1 })}
      value={linesBuyers[index].responsibleCode}
      id='select-responsible'
      required
      loading={responsibleFromApiLoading}
      options={responsibleFromApi[index]}
    />
  )
})

export default ResponsibleInput
