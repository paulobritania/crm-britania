import React, { forwardRef } from 'react'

import isEmpty from 'lodash/isEmpty'

import { useT } from '@britania-crm/i18n'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useLinesBuyers } from '@britania-crm/services/hooks/useLinesBuyers'
import { useSnackbar } from '@britania-crm/snackbar'

import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import InputSelect from '@britania-crm/web-components/InputSelect'

const RegionalInput = forwardRef((props, ref) => {
  const { index, matrixCode, formRef } = props
  const t = useT()
  const snackbar = useSnackbar()
  const {
    linesBuyers,
    handleLineChange,
    handleArrayRegional,
    regionalFromApi
  } = useLinesBuyers()

  const line = linesBuyers[index].line
  const family = linesBuyers[index].family
  const responsible = linesBuyers[index].responsible

  const { loading: regionalFromApiLoading } = useCrmApi(
    matrixCode && !!responsible && isEmpty(regionalFromApi[index])
      ? [
          customerCrmRoutes.getRegional.replace(':clientCode', matrixCode, [
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
        handleArrayRegional(index, data)
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
      disabled={isEmpty(regionalFromApi[index])}
      onChange={(e) => handleLineChange(index, e, formRef)}
      name='regionalManager'
      label={t('regional manager')}
      id='select-regional'
      value={linesBuyers[index].regionalManager}
      required
      loading={regionalFromApiLoading}
      options={regionalFromApi[index]}
    />
  )
})

export default RegionalInput
