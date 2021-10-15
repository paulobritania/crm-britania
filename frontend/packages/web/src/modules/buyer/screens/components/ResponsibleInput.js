import React, { useEffect, useState } from 'react'

import { AppActions } from '@britania-crm/stores/app'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'

import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

const ResponsibleInput = ({
  index,
  matrixCode,
  listByLineOfFamily,
  linesAndFamilies,
  isView
}) => {
  const { data: representativeFromApi, loading: representativeFromApiLoading } =
    useCrmApi(
      matrixCode && !isEmpty(listByLineOfFamily)
        ? [
            customerCrmRoutes.getResponsible.replace(
              ':clientCode',
              matrixCode,
              listByLineOfFamily
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
        revalidateOnFocus: false,
        onSuccess(data) {
          const responsible = formRef.current.getFieldValue('responsible')
          if (isEmpty(responsible)) {
            formRef.current.setFieldValue('responsible', first(data))
          }
        },
        onErrorRetry(error) {
          if (error.response.status === 500) {
            snackbar.error(getErrorMessage(error))
          }
        }
      }
    )

  return (
    <InputSelect
      detached
      valueKey='approverDescription'
      disabled={isDisabled || isEmpty(familiesFromApi)}
      onChange={handleLineChange(index)}
      name='responsible'
      label={t('responsible', { howMany: 1 })}
      id='select-responsible'
      loading={representativeFromApiLoading}
      required
      options={representativeFromApi}
    />
  )
}

export default ResponsibleInput
