import React, { useState, useCallback, useMemo } from 'react'

import { cpf, cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import { Grid, Typography } from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import InfoIcon from '@material-ui/icons/Info'

import { useDialog } from '@britania-crm/dialog'
import { useFormEffect } from '@britania-crm/forms'
import { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  vpc as vpcRoutes,
  users as usersRoutes,
  banks as bankCrmRoutes,
  customer as customerCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { colors } from '@britania-crm/styles'
import { trimMask } from '@britania-crm/utils/formatters'
import Checkbox from '@britania-crm/web-components/Checkbox'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputDate from '@britania-crm/web-components/InputDate'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputMoney from '@britania-crm/web-components/InputMoney'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import TextArea from '@britania-crm/web-components/TextArea'
import LineFamilyBlock from '@britania-crm/web-src/modules/vpc/containers/LineFamilyBlock'
import CustomerContract from '@britania-crm/web-src/modules/vpc/modals/CustomerContract'
import WorkFlowExecution from '@britania-crm/web-src/modules/workflow/containers/WorkFlowExecution'

import { Container, FlexContainer, Info, Label } from './styles'

export const VpcData = ({
  disabled,
  formRef,
  permissions,
  workflowTaskInProgress,
  id,
  deploymentDate
}) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [cnpj, setCnpj] = useState('')
  const [parentCompany, setParentCompany] = useState({})
  const [paymentType, setPaymentType] = useState('')
  const [foundType, setFoundType] = useState('')
  const [approverCode, setApproverCode] = useState('')

  const banckParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10
    }),
    []
  )

  const { data: clientsFromApi } = useCrmApi(
    cnpj && cnpj !== parentCompany?.cnpj
      ? [customerCrmRoutes.getInfoCustomer, cnpj]
      : null,
    {
      params: {
        clientRegistrationType: 'REGISTER',
        cnpj,
        page: 1,
        pageSize: 10
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess(value) {
        handleCompany(first(value))
      }
    }
  )

  const foundOptions = useMemo(
    () => [
      { id: 'EXTRA', name: 'EXTRA' },
      { id: 'NORMAL', name: 'NORMAL' },
      { id: 'CONTRATUAL', name: 'CONTRATUAL' }
    ],
    []
  )

  const paymentOptions = useMemo(
    () => [
      { id: 'DESCONTO DUPLICATA', name: 'Desconto Duplicata' },
      { id: 'DEPOSITO', name: 'Deposito' },
      { id: 'MERCADORIA', name: 'Mercadoria' }
    ],
    []
  )

  const parentCompanyParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      clientRegistrationType: 'REGISTER'
    }),
    []
  )

  const handleChangeCnpj = useCallback(
    debounce((value) => {
      if (!value) {
        setCnpj('')
      }
      if (trimMask(value).length === 11) {
        cpf.isValid(trimMask(value)) && setCnpj(trimMask(value))
      }
      if (trimMask(value).length === 14) {
        cnpjValidator.isValid(trimMask(value)) && setCnpj(trimMask(value))
      }
    }, 500),
    [clientsFromApi]
  )

  const handleCompany = useCallback(
    (value) => {
      if (!isEmpty(value)) {
        setParentCompany(value)
        formRef.current.setFieldValue('cnpj', value?.cnpj)
        formRef.current.setFieldValue('parentCompanyCode', value)
        formRef.current.setFieldValue('parentCompany', value)
        formRef.current.setFieldValue('companyName', value?.companyName)
      } else {
        setParentCompany({})
      }
    },
    [formRef]
  )

  const handleChangeValue = useCallback(
    (_, fieldMounted) => fieldMounted && formRef.current.validateField('nds'),
    [formRef]
  )

  const handleInfoCustomerContract = useCallback(
    () =>
      createDialog({
        id: 'modal-customer-contract',
        Component: CustomerContract,
        props: {
          parentCompanyCode: parentCompany?.parentCompanyCode,
          responsibleCode: approverCode
        }
      }),
    [approverCode, createDialog, parentCompany.parentCompanyCode]
  )

  useFormEffect(() => {
    if (isEmpty(parentCompany)) {
      formRef.current.setFieldValue('cnpj', INITIAL_VALUES.cnpj)
      formRef.current.setFieldValue(
        'parentCompanyCode',
        INITIAL_VALUES.parentCompanyCode
      )
      formRef.current.setFieldValue(
        'parentCompany',
        INITIAL_VALUES.parentCompany
      )
    }
  }, [formRef, parentCompany])

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <InputCpfCnpj
            label='CPF/CNPJ'
            name='cnpj'
            disabled={disabled}
            onValueChange={handleChangeCnpj}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputAutocomplete
            name='parentCompany'
            label={t('matrix')}
            url={customerCrmRoutes.getInfoCustomer}
            disabled={disabled}
            valueKey='parentCompanyName'
            paramName='parentCompany'
            params={parentCompanyParams}
            onValueChange={handleCompany}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputAutocomplete
            name='parentCompanyCode'
            label={t('matrix code', { abbreviation: false })}
            url={customerCrmRoutes.getInfoCustomer}
            disabled={disabled}
            valueKey='parentCompanyCode'
            paramName='parentCompanyCode'
            params={parentCompanyParams}
            onValueChange={handleCompany}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputText
            label={t('company name')}
            name='companyName'
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputSelect
            name='foundsType'
            label={t('type of funds')}
            options={foundOptions}
            disabled={disabled}
            onValueChange={setFoundType}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputSelect
            name='paymentType'
            label={t('type of payment')}
            options={paymentOptions}
            onValueChange={setPaymentType}
            disabled={disabled}
          />
        </Grid>
        {paymentType === 'DEPOSITO' && (
          <>
            <Grid item xs={12} md={5}>
              <InputAutocomplete
                name='bank'
                label={t('bank')}
                url={bankCrmRoutes.getAll}
                params={banckParams}
                normalizeDataFn={(options) =>
                  map(options, ({ code, description }) => ({
                    code,
                    description,
                    label: `${code} - ${description}`
                  }))
                }
                valueKey='label'
                paramName='description'
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputNumber
                name='bankAgency'
                label={t('agency', { howMany: 1 })}
                maxLength={4}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputNumber
                name='bankAccount'
                label={t('account', { howMany: 1 })}
                maxLength={4}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputCpfCnpj
                name='bankCnpj'
                label='CNPJ'
                mode='cnpj'
                disabled={disabled}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} md={3}>
          <InputText
            label={t('request number')}
            name='requestNumber'
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputDate
            detached
            value={deploymentDate}
            label={t('implantation date')}
            name='deploymentDate'
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputMoney
            label={t('value')}
            name='value'
            disabled={disabled}
            onValueChange={handleChangeValue}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputNumber
            label={t('negotiation number')}
            name='negotiationNumber'
            disabled={disabled || foundType !== 'EXTRA'}
          />
        </Grid>
        <Grid item xs={12}>
          <LineFamilyBlock
            formRef={formRef}
            disabled={disabled}
            parentCompany={parentCompany}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextArea
            label={`${t('campaign')}/${t('reason')}`}
            name='campaignReason'
            disabled={disabled}
            maxLength={500}
            rows={2}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <InputDateRange
            name='period'
            label={t('period', { howMany: 1 })}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputAutocomplete
            name='approverCode'
            label={t('approver')}
            url={usersRoutes.regionalManager}
            valueKey='description'
            paramName='code'
            disabled={disabled}
            onValueChange={setApproverCode}
          />
        </Grid>
        {!!id && (
          <>
            <Grid item xs={12} md={1} style={{ display: 'flex' }}>
              <FlexContainer>
                <Label>{t('status')}</Label>
                <Checkbox
                  detached
                  disabled={true}
                  style={{ color: colors.black2 }}
                  label={
                    formRef.current.getFieldValue('status')
                      ? t('active')
                      : t('inactive')
                  }
                  value={formRef.current.getFieldValue('status')}
                  icon={
                    <FiberManualRecordIcon
                      fontSize='small'
                      htmlColor={colors.error.main}
                    />
                  }
                  checkedIcon={
                    <FiberManualRecordIcon
                      fontSize='small'
                      htmlColor={colors.success.main}
                    />
                  }
                />
                <InputHidden name='status' />
              </FlexContainer>
            </Grid>

            <Grid item xs={12} md={5} style={{ display: 'flex' }}>
              <InputText
                label={t('situation')}
                name='situation'
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} md={4} style={{ display: 'flex' }}>
              <InputText
                label={t('responsible', { howMany: 1 })}
                name='responsible'
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Info onClick={handleInfoCustomerContract}>
                <div>
                  <InfoIcon htmlColor={colors.info.main} />
                  <I18n as={Typography}>customer contract information</I18n>
                </div>
              </Info>
            </Grid>
          </>
        )}

        {permissions && disabled && (
          <Grid item sm={12}>
            <WorkFlowExecution
              baseUrl={vpcRoutes.getOne.replace(':vpcId', id)}
              taskInProgress={workflowTaskInProgress}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

VpcData.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  permissions: PropTypes.bool.isRequired,
  workflowTaskInProgress: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deploymentDate: PropTypes.string
}

VpcData.defaultProps = {
  id: '',
  workflowTaskInProgress: {},
  deploymentDate: null
}

export default VpcData
