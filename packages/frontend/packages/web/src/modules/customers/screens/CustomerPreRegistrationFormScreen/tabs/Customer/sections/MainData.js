import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect
} from 'react'
import { useSelector } from 'react-redux'

import { cnpj } from 'cpf-cnpj-validator'
import PropTypes from 'prop-types'

import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useFormEffect } from '@britania-crm/forms'
import { useT } from '@britania-crm/i18n'
import {
  representative as representativeRoutes,
  customer as customerCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import { searchStates } from '@britania-crm/services/apis/ibgeApi'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { selectUserRepresentative } from '@britania-crm/stores/auth/auth.selectors'
import { trimMask } from '@britania-crm/utils/formatters'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputCEP from '@britania-crm/web-components/InputCEP'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputEmail from '@britania-crm/web-components/InputEmail'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputStateRegistration from '@britania-crm/web-components/InputStateRegistration'
import InputText from '@britania-crm/web-components/InputText'
import Tooltip from '@britania-crm/web-components/Tooltip'

import useStyles, {
  FlexContainer,
  Info
} from '../styles'

const MainData = ({
  formRef, disabled, status, isEdit
}) => {
  const t = useT()
  const classes = useStyles()
  const representativeUser = useSelector(selectUserRepresentative)

  const [state, setState] = useState('')
  const [stateOptions, setStateOptions] = useState([])
  const [parentCnpj, setParentCnpj] = useState('')
  const [parentData, setParentData] = useState({})

  const addressLoaded = useRef(false)

  const respresentativeParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10
    }),
    []
  )

  const handleParentDataFromApi = useCallback(
    (value) => {
      if (isEmpty(value)) {
        formRef.current.setFieldError('parentCompanyCnpj', t('cnpj does not match matrix'))
        formRef.current.setFieldValue('parentCompanyCnpj', '')
        setParentCnpj('')
      } else {
        formRef.current.setFieldValue('parentCompanyName', first(value))
        formRef.current.setFieldValue('parentCompanyCnpj', first(value?.cnpj))
      }
    },
    [formRef, t]
  )

  const { loading: clientsFromApiLoading } = useCrmApi(
    (parentCnpj && parentCnpj !== parentData?.cnpj)
      ? [customerCrmRoutes.getInfoCustomer, parentCnpj]
      : null,
    {
      params: {
        clientRegistrationType: 'REGISTER',
        cnpj: parentCnpj,
        page: 1,
        pageSize: 10
      }
    },
    {
      onSuccess: handleParentDataFromApi,
      revalidateOnFocus: false
    }
  )

  const getStateOptions = useCallback(
    async () => {
      const states = await searchStates()
      setStateOptions(states)
    },
    []
  )

  const handleChangeState = useCallback(
    (newState, fieldMounted) => {
      setState(newState)
      if (fieldMounted) {
        formRef.current.validateField('stateRegistration')
      }
    },
    [formRef]
  )

  const handleAddressChange = useCallback(
    (address) => {
      if (addressLoaded.current) {
        formRef.current.setData({
          ...address,
          district: address.neighborhood,
          publicPlace: address.street
        })
      }
      addressLoaded.current = true
    },
    [formRef]
  )

  const setRepresentativeName = useCallback(
    (value) => {
      formRef.current.setFieldValue('responsibleCode', value)
    },
    [formRef]
  )

  const setRepresentativeCode = useCallback(
    (value) => {
      formRef.current.setFieldValue('responsibleName', value)
    },
    [formRef]
  )

  const HandleCompanyName = useCallback(
    (value) => {
      setParentData(value)
      if (cnpj.isValid(value?.cnpj)) {
        formRef.current.setFieldValue('parentCompanyCnpj', value.cnpj)
      } else {
        setParentCnpj('')
        formRef.current.setFieldValue('parentCompanyCnpj', '')
      }
    },
    [formRef]
  )

  const HandleParentCnpj = useCallback(
    (value) => {
      const rowValue = trimMask(value)
      if (cnpj.isValid(rowValue)) {
        rowValue !== parentData?.cnpj && setParentCnpj(rowValue)
      }
    },
    [parentData.cnpj]
  )

  useFormEffect(
    () => {
      if (!isEmpty(representativeUser) && !isEdit) {
        formRef.current.setFieldValue('responsibleCode', first(representativeUser))
        formRef.current.setFieldValue('responsibleName', first(representativeUser))
      }
    },
    [formRef, isEdit, representativeUser])

  useEffect(
    () => {
      getStateOptions()
    },
    [getStateOptions]
  )

  useLayoutEffect(
    () => {
      if (!disabled && !isEdit) {
        addressLoaded.current = true
      }
    },
    [disabled, getStateOptions, isEdit]
  )

  return (
    <Grid container spacing={ 1 } className={ classes.container }>
      <Grid item xs={ 2 }>
        <InputAutocomplete
          url={ representativeRoutes.getRepresentativeList }
          params={ respresentativeParams }
          valueKey="code"
          paramName="name"
          name="responsibleCode"
          label={ t('code', { howMany: 1 }) }
          readOnly={ disabled }
          onValueChange={ setRepresentativeCode }
        />

      </Grid>
      <Grid item xs={ 10 } md={ 4 }>
        <InputAutocomplete
          url={ representativeRoutes.getRepresentativeList }
          params={ respresentativeParams }
          valueKey="name"
          paramName="name"
          name="responsibleName"
          label={ t('responsible', { howMany: 1 }) }
          readOnly={ disabled }
          onValueChange={ setRepresentativeName }
        />
      </Grid>
      {
        status && (
          <Grid item sm={ 4 } className={ classes.status }>
            <Typography> { t('situation') } </Typography>
            <Typography>{ status } </Typography>
          </Grid>
        )
      }
      <Grid item sm={ 12 } md={ 6 }>
        <InputText
          name="companyName"
          label={ t('company name') }
          readOnly={ disabled }
          maxLength={ 71 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputCpfCnpj
          name="cnpj"
          label="CNPJ"
          mode="cnpj"
          readOnly={ disabled }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputStateRegistration
          name="stateRegistration"
          label={ t('state registration') }
          readOnly={ disabled }
          state={ state }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputNumber
          name="suframa"
          label={ t('suframa') }
          readOnly={ disabled }
          maxLength={ 15 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputPhone
          name="commercialPhone"
          label={ t('commercial phone') }
          readOnly={ disabled }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputPhone
          name="billingPhone"
          label={ t('billing phone') }
          readOnly={ disabled }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputPhone
          name="cellphone"
          label={ t('cell {this}', { this: t('phone', { howMany: 1 }) }) }
          readOnly={ disabled }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputPhone
          name="shoppingPhone"
          label={ t('phone shopping') }
          readOnly={ disabled }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputEmail
          name="billingEmail"
          label={ t('billing email') }
          readOnly={ disabled }
          maxLength={ 71 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputEmail
          name="invoiceShippingEmail"
          label={ t('invoice shipping email') }
          readOnly={ disabled }
          maxLength={ 71 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputEmail
          name="businessEmail"
          label={ t('business email') }
          readOnly={ disabled }
          maxLength={ 71 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputText
          name="site"
          label={ t('site') }
          readOnly={ disabled }
          maxLength={ 41 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputText
          name="country"
          label={ t('country') }
          maxLength={ 41 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 2 }>
        <InputCEP
          name="zipCode"
          label="CEP"
          readOnly={ disabled }
          onAddressChange={ handleAddressChange }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 1 }>
        <InputSelect
          name="state"
          label="UF"
          readOnly={ disabled }
          valueKey="sigla"
          idKey="sigla"
          options={ stateOptions }
          onValueChange={ handleChangeState }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputText
          name="city"
          label={ t('city', { howMany: 1 }) }
          readOnly={ disabled }
          maxLength={ 41 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputText
          name="district"
          label={ t('district', { howMany: 1 }) }
          readOnly={ disabled }
          maxLength={ 41 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 4 }>
        <InputText
          name="publicPlace"
          label={ t('public place') }
          readOnly={ disabled }
          maxLength={ 71 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 2 }>
        <InputText
          name="number"
          label={ t('number', { howMany: 1 }) }
          readOnly={ disabled }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <InputText
          name="complement"
          label={ t('complement', { howMany: 1 }) }
          readOnly={ disabled }
          maxLength={ 71 }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 6 }>

        <InputAutocomplete
          url={ customerCrmRoutes.getInfoCustomer }
          params={ { pageSize: 10, page: 1 } }
          valueKey="companyName"
          paramName="companyName"
          name="parentCompanyName"
          label={ `${ t('company name') } ${ t('matrix') }` }
          disabled={ disabled || clientsFromApiLoading }
          onValueChange={ HandleCompanyName }
          loading={ clientsFromApiLoading }
        />
      </Grid>

      <Grid item sm={ 12 } md={ 3 }>
        <FlexContainer>
          <InputCpfCnpj
            name="parentCompanyCnpj"
            label={ `CNPJ ${ t('matrix') }` }
            mode="cnpj"
            readOnly={ disabled }
            onValueChange={ HandleParentCnpj }
          />
          <Info>
            <Tooltip title={ t('matrix fill information') } arrow>
              <InfoIcon/>
            </Tooltip>
          </Info>

        </FlexContainer>

      </Grid>
    </Grid>
  )
}

MainData.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  status: PropTypes.string,
  isEdit: PropTypes.bool
}

MainData.defaultProps = { status: '', isEdit: false }

export default MainData
