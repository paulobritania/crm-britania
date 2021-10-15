import React, { useEffect, useState } from 'react'

import { AppActions } from '@britania-crm/stores/app'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'

import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

const ResponsibleInput = ({
  index,
  matrixCode,
  customerCrmRoutes,
  linesAndFamilies,
  isView
}) => {
  const { loading: regionalFromApiLoading } = useCrmApi(
    matrixCode && !isEmpty(linesAndFamilies)
      ? [
          customerCrmRoutes.getRegional.replace(
            ':clientCode',
            matrixCode,
            linesAndFamilies
          ),
          {
            page: 1,
            pageSize: 10,
            linesAndFamilies
          }
        ]
      : null,
    {
      params: {
        page: 1,
        pageSize: 10,
        linesAndFamilies
      }
    },
    {
      onSuccess(data) {
        const regional = formRef.current.getFieldValue('regionalManager')

        if (
          first(data)?.approverCode !== regional.approverCode &&
          !isEmpty(regional)
        ) {
          setDisabledButton(true)
          setFamily([])
          setLine('')
          snackbar.error(t('many managers found'))
        } else {
          setDisabledButton(false)
        }

        if (isEmpty(regional)) {
          formRef.current.setFieldValue('regionalManager', first(data))
        }
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
      detached
      valueKey='approverDescription'
      disabled={isDisabled || isEmpty(regionalFromApi)}
      onChange={handleLineChange(index)}
      name='regionalManager'
      label={t('regional manager')}
      id='select-regional'
      loading={regionalFromApiLoading}
      required
      options={regionalFromApi}
    />
  )
}

export default ResponsibleInput
