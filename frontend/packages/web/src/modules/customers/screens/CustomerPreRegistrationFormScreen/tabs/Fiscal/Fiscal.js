import React, {
  useMemo,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useDialog } from '@britania-crm/dialog'
import { Scope } from '@britania-crm/forms'
import cfopSchema, { INITIAL_VALUES as CFOP_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfop.schema'
import cfopAgscSchema, { INITIAL_VALUES as CFOP_AGSC_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfopAgsc.schema'
import cfopAgspSchema, { INITIAL_VALUES as CFOP_AGSP_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfopAgsp.schema'
import cfopManausSchema, { INITIAL_VALUES as CFOP_MANAUS_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfopManaus.schema'
import cfopStSchema, { INITIAL_VALUES as CFOP_ST_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfopSt.schema'
import I18n, { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
// import CustomAccordion from '@britania-crm/web-components/CustomAccordion'
import IconButton from '@britania-crm/web-components/IconButton'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import InputDate from '@britania-crm/web-components/InputDate'
import InputHidden from '@britania-crm/web-components/InputHidden'
import RadioGroup from '@britania-crm/web-components/RadioGroup'
import Tooltip from '@britania-crm/web-components/Tooltip'

import PreRegistrationCfopModal from '../../../../modals/PreRegistrationCfopModal'
import useStyles from './styles'

const Customer = ({
  formRef, disabled, handleDocumentation
}) => {
  const t = useT()
  const classes = useStyles()
  const { createDialog } = useDialog()

  const radioOptions = useMemo(
    () => [
      { id: true, name: 'Sim' },
      { id: false, name: 'Não' }
    ],
    []
  )

  const handleChangeNonAcumulative = useCallback(
    () => {
      formRef.current.reloadSchema()
    },
    [formRef]
  )

  const handleOpenCfopModal = useCallback(
    () => createDialog({
      id: 'cfop',
      Component: PreRegistrationCfopModal,
      props: {
        disabled,
        title: t('cfop'),
        schema: cfopSchema,
        defaultValues: {
          ...CFOP_INITIAL_VALUES,
          ...(formRef.current.getFieldValue('fiscalParametrizationCfop')?.cfop || {})
        },
        onSubmit (values) {
          formRef.current.setFieldValue('fiscalParametrizationCfop', (old) => ({
            ...old,
            cfop: {
              ...(old?.cfop || {}),
              ...values
            }
          }))
        }
      }
    }),
    [createDialog, disabled, formRef, t]
  )

  const handleOpenCfopStModal = useCallback(
    () => createDialog({
      id: 'cfop',
      Component: PreRegistrationCfopModal,
      props: {
        disabled,
        title: t('cfop {this}', { this: 'ST' }),
        schema: cfopStSchema,
        defaultValues: {
          ...CFOP_ST_INITIAL_VALUES,
          ...(formRef.current.getFieldValue('fiscalParametrizationCfop')?.st || {})
        },
        onSubmit (values) {
          formRef.current.setFieldValue('fiscalParametrizationCfop', (old) => ({
            ...old,
            st: {
              ...(old?.st || {}),
              ...values
            }
          }))
        }
      }
    }),
    [createDialog, disabled, formRef, t]
  )

  const handleOpenCfopManausModal = useCallback(
    () => createDialog({
      id: 'cfop',
      Component: PreRegistrationCfopModal,
      props: {
        disabled,
        title: t('cfop {this}', { this: 'Manaus' }),
        schema: cfopManausSchema,
        defaultValues: {
          ...CFOP_MANAUS_INITIAL_VALUES,
          ...(formRef.current.getFieldValue('fiscalParametrizationCfop')?.manaus || {})
        },
        onSubmit (values) {
          formRef.current.setFieldValue('fiscalParametrizationCfop', (old) => ({
            ...old,
            manaus: {
              ...(old?.manaus || {}),
              ...values
            }
          }))
        }
      }
    }),
    [createDialog, disabled, formRef, t]
  )

  const handleOpenCfopAgscModal = useCallback(
    () => createDialog({
      id: 'cfop',
      Component: PreRegistrationCfopModal,
      props: {
        disabled,
        title: t('cfop {this}', { this: 'AG/SC' }),
        schema: cfopAgscSchema,
        defaultValues: {
          ...CFOP_AGSC_INITIAL_VALUES,
          ...(formRef.current.getFieldValue('fiscalParametrizationCfop')?.agSc || {})
        },
        onSubmit (values) {
          formRef.current.setFieldValue('fiscalParametrizationCfop', (old) => ({
            ...old,
            agsc: {
              ...(old?.agsc || {}),
              ...values
            }
          }))
        }
      }
    }),
    [createDialog, disabled, formRef, t]
  )

  const handleOpenCfopAgspModal = useCallback(
    () => createDialog({
      id: 'cfop',
      Component: PreRegistrationCfopModal,
      props: {
        disabled,
        title: t('cfop {this}', { this: 'AG/SP' }),
        schema: cfopAgspSchema,
        defaultValues: {
          ...CFOP_AGSP_INITIAL_VALUES,
          ...(formRef.current.getFieldValue('fiscalParametrizationCfop')?.agSp || {})
        },
        onSubmit (values) {
          formRef.current.setFieldValue('fiscalParametrizationCfop', (old) => ({
            ...old,
            agsp: {
              ...(old?.agsp || {}),
              ...values
            }
          }))
        }
      }
    }),
    [createDialog, disabled, formRef, t]
  )

  return (
    <Grid container spacing={ 1 }>

      <Scope path="fiscalParametrization">
        <Grid item sm={ 12 } className={ classes.iconInfo }>
          {handleDocumentation && (
            <Tooltip title={ t('documentation', { howMany: 1 }) } arrow>
              <IconButton color="care" onClick={ handleDocumentation } >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name={ 'doNotRetainIcms' }
            label={ t('do not retain icms') }
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name={ 'icmsSubstitute' }
            label={ t('icms substitute') }
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name={ 'icmsTaxpayer' }
            label={ t('icms tax payer') }
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name={ 'optingSuspensionsIpi' }
            label={ t('opting suspensions ipi') }
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name={ 'buysPhilco' }
            label={ t('buys philco') }
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name={ 'withholdTax' }
            label={ t('withhold tax') }
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name={ 'retentionAgent' }
            label={ t('retention agent') }
            options={ radioOptions }
            disabled={ disabled }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 12 }>
          <I18n as={ Typography } className={ classes.heading }>
            tax regime
          </I18n>
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="fullNonAcumulative"
            label={ t('full non acumulative') }
            options={ radioOptions }
            disabled={ disabled }
            onValueChange={ handleChangeNonAcumulative }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 }>
          <InputDate
            name="expirationDate"
            label={ t('expiration date') }
            disabled={ disabled }
          />
        </Grid>
      </Scope>

      <Grid item xs={ 12 } />

      <Grid item xs={ 12 }>

        <Grid container spacing={ 1 }>

          <Grid item style={ { flex: 1 } }>
            <I18n as={ Button }
              onClick={ handleOpenCfopModal }
              style={ { width: '100%', whiteSpace: 'nowrap' } }
              color="warning"
              variant="outlined"
            >
            cfop
            </I18n>
          </Grid>

          <Grid item style={ { flex: 1 } }>
            <I18n as={ Button }
              params={ { this: 'ST' } }
              onClick={ handleOpenCfopStModal }
              style={ { width: '100%', whiteSpace: 'nowrap' } }
              color="warning"
              variant="outlined"
            >
              {'cfop {this}'}
            </I18n>
          </Grid>

          <Grid item style={ { flex: 1 } }>
            <I18n as={ Button }
              params={ { this: 'Manaus' } }
              onClick={ handleOpenCfopManausModal }
              style={ { width: '100%', whiteSpace: 'nowrap' } }
              color="warning"
              variant="outlined"
            >
              {'cfop {this}'}
            </I18n>
          </Grid>

          <Grid item style={ { flex: 1 } }>
            <I18n as={ Button }
              params={ { this: 'AG/SC' } }
              onClick={ handleOpenCfopAgscModal }
              style={ { width: '100%', whiteSpace: 'nowrap' } }
              color="warning"
              variant="outlined"
            >
              {'cfop {this}'}
            </I18n>
          </Grid>

          <Grid item style={ { flex: 1 } }>
            <I18n as={ Button }
              params={ { this: 'AG/SP' } }
              onClick={ handleOpenCfopAgspModal }
              style={ { width: '100%', whiteSpace: 'nowrap' } }
              color="warning"
              variant="outlined"
            >
              {'cfop {this}'}
            </I18n>
          </Grid>
        </Grid>
      </Grid>

      <InputHidden name="fiscalParametrizationCfop" />

    </Grid>
  )
}

Customer.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleDocumentation: PropTypes.func.isRequired
}

export default Customer
