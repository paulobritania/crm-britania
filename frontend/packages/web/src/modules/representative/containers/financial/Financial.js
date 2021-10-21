import React, {
  useCallback,
  useState
} from 'react'

import { Scope } from '@unform/core'
import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'

import { useT } from '@britania-crm/i18n'
import {
  customer as customerCrmRoutes,
  clients as clientsCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputDate from '@britania-crm/web-components/InputDate'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputText from '@britania-crm/web-components/InputText'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

import useStyles from '../styles'

const Financial = ({ disabled, formRef }) => {
  const t = useT()
  const classes = useStyles()

  const [shortName, setShortName] = useState('')
  const [nameMatrix, setNameMatrix] = useState('')

  const handleParentDataFromApi = useCallback(
    (value) => {
      if (isEmpty(value)) {
        formRef.current.setFieldError('financial.matrix', 'Matriz Invalida')
      }
    },
    [formRef]
  )

  const { loading } = useCrmApi(nameMatrix ? [customerCrmRoutes.getInfoCustomer, nameMatrix] : null,
    {
      params: {
        page: 1,
        pageSize: 10,
        parentCompany: nameMatrix
      }
    }
    , {
      onSuccess: handleParentDataFromApi,
      revalidateOnFocus: false
    })

  const handleShortName = useCallback(
    (value) => {
      setShortName(value)
    },
    []
  )

  const handleValidNames = useCallback(
    debounce((value) => {
      if (value !== shortName) {
        setNameMatrix(value)
      }
    }, 1000),
    [shortName]
  )

  return (
    <Grid container spacing={ 1 } className={ classes.containerMain } >
      <Scope path="financial">
        <Grid item sm={ 12 } md={ 3 }>
          <InputAutocomplete
            url={ clientsCrmRoutes.getGroups }
            paramName="nameClientGroup"
            valueKey="nameClientGroup"
            label={ t('customers group') }
            name="clientGroup"
            disabled={ disabled }
          />
          <InputHidden name="clientGroupCode" showError />
        </Grid>
        <Grid item sm={ 12 } md={ 5 }>
          <InputText
            name="shortName"
            label={ t('short name') }
            disabled={ disabled }
            onValueChange={ handleShortName }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 6 }>
          <InputText
            name="matrix"
            label={ t('matrix', { howMany: 1 }) }
            disabled={ disabled }
            onValueChange={ handleValidNames }
            maxLength={ 71 }
            InputProps={ {
              endAdornment: (
                <InputAdornment position="end">
                  {loading && (
                    <CircularProgress
                      color="inherit"
                      size={ 18 }
                    />
                  ) }
                </InputAdornment>
              )
            } }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 6 }>
          <InputText
            name="historic"
            label={ t('historic', { howMany: 1 }) }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="carrier"
            label={ t('carrier') }
            disabled={ disabled }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <RadioGroup
            name="receivesNfe"
            options={ [{ id: true, name: t('receives nfe') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="bankInstructions"
            label={ t('banking instructions') }
            disabled={ disabled }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 5 }>
          <InputText
            name="standardIncomeInstructions"
            label={ t('standard recipe instructions') }
            disabled={ disabled }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 7 } />
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="issueBankSlip"
            options={ [{ id: true, name: t('issues billet') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="generatesDebitNotice"
            options={ [{ id: true, name: t('generates debit notice') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="calculatesFine"
            options={ [{ id: true, name: t('calculates fine') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="receivesSciInformation"
            options={ [{ id: true, name: t('receives sci information') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="simpleClient"
            options={ [{ id: true, name: t('simple client') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="icmsTaxpayer"
            options={ [{ id: true, name: t('icms taxpayer') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="buysPhilco"
            options={ [{ id: true, name: t('receives nfe') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="fullNonCumulative"
            options={ [{ id: true, name: t('100% non-cumulative') }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 6 }>
          <InputDate
            name="expirationDate"
            label={ t('validity') }
            disabled={ disabled }
          />
        </Grid>
      </Scope>
    </Grid>
  )
}

Financial.propTypes = { disabled: PropTypes.bool.isRequired, formRef: PropTypes.any.isRequired }

export default Financial
