import React, { useState, forwardRef } from 'react'

import isEmpty from 'lodash/isEmpty'

import { useT } from '@britania-crm/i18n'
import { AppActions } from '@britania-crm/stores/app'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useLinesBuyers } from '@britania-crm/services/hooks/useLinesBuyers'

import { lines as linesCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'

import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import InputSelect from '@britania-crm/web-components/InputSelect'

const FamilyInput = forwardRef((props, ref) => {
  const { index } = props
  const t = useT()
  const [familiesFromApiLoading, setFamiliesFromApiLoading] = useState(false)
  const [family, setFamily] = useState('')
  const { linesBuyers, handleLineChange } = useLinesBuyers()

  useCrmApi(
    [linesCrmRoutes.getFamilies],
    {
      params: {
        clientTotvsCode: 1049,
        lines: 7
      }
    },
    {
      onSuccess(data) {
        setFamiliesFromApi(data)
        setFamiliesFromApiLoading(false)
      },
      onErrorRetry(error, key, config, revalidate, { retryCount }) {
        if (error.response.status === 500 && retryCount < 5 && !isView) {
          createDialog({
            id: 'new-request-family-modal',
            Component: ConfirmModal,
            props: {
              onConfirm() {
                revalidate({ retryCount })
              },
              text: t('search error family')
            }
          })
        } else {
          dispatch(
            AppActions.addAlert({
              type: 'error',
              message: t('maximum number of attempts reached')
            })
          )
        }
      },
      revalidateOnFocus: false
    }
  )

  return (
    <InputSelect
      detached
      valueKey='familyDescription'
      idKey='familyCode'
      disabled={isEmpty(linesBuyers)}
      value={family}
      onChange={handleLineChange(index)}
      name='family'
      label={t('family', { howMany: 1 })}
      id='select-family'
      loading={familiesFromApiLoading}
      required
      options={linesBuyers}
    />
  )
})

export default FamilyInput
