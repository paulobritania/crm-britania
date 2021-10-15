import React, { useEffect, useState } from 'react'

import isEmpty from 'lodash/isEmpty'

import I18n, { useT } from '@britania-crm/i18n'
import { AppActions } from '@britania-crm/stores/app'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'

import { lines as linesCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'

import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import InputSelect from '@britania-crm/web-components/InputSelect'

const FamilyInput = ({ index }) => {
  const t = useT()
  const [familiesFromApiLoading, setFamiliesFromApiLoading] = useState(false)
  const [familiesFromApi, setFamiliesFromApi] = useState([])
  const [family, setFamily] = useState('')

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

  const handleFamilyChange = (evt) => {
    setFamily(evt.target.value)
  }

  return (
    <InputSelect
      detached
      valueKey='familyDescription'
      idKey='familyCode'
      disabled={isEmpty(familiesFromApi)}
      value={family}
      onChange={handleFamilyChange}
      name='family'
      label={t('family', { howMany: 1 })}
      id='select-family'
      loading={familiesFromApiLoading}
      required
      options={familiesFromApi}
    />
  )
}

export default FamilyInput
