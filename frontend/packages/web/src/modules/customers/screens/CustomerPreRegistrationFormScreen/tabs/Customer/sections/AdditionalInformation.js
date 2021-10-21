import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { Scope } from '@britania-crm/forms'
import I18n, { useT } from '@britania-crm/i18n'
import CardRounded from '@britania-crm/web-components/CardRounded'
import InputMoney from '@britania-crm/web-components/InputMoney'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import BankReferencesTable from '@britania-crm/web-src/modules/customers/containers/BankReferencesTable'
import CommercialReferencesTable from '@britania-crm/web-src/modules/customers/containers/CommercialReferencesTable'
import CompanyHoldingParticipationTable from '@britania-crm/web-src/modules/customers/containers/CompanyHoldingParticipationTable'
import CounterPropertiesTable from '@britania-crm/web-src/modules/customers/containers/CounterPropertiesTable'
import RevenuesTable from '@britania-crm/web-src/modules/customers/containers/RevenuesTable'

import useStyles from '../styles'

const AdditionalInformation = ({ formRef, disabled }) => {
  const t = useT()
  const classes = useStyles()

  const initialContactOptions = useMemo(
    () => [
      { id: 'CLIENTE', name: t('client', { howMany: 1 }) },
      { id: 'REPRESENTANTE', name: `${ t('representative', { howMany: 1 }) }/${ t('consultant', { howMany: 1 }) }` }
    ],
    [t]
  )

  return (
    <Scope path="additionalInformation">
      <Grid container spacing={ 1 } className={ classes.container }>
        <Grid item sm={ 12 } md={ 3 }>
          <InputSelect
            name="initialContact"
            label={ t('initial contact') }
            options={ initialContactOptions }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputNumber
            name="numbersOfEmployes"
            label={ t('number of employers') }
            readOnly={ disabled }
            maxLength={ 7 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputMoney
            name="suggestedLimit"
            label={ t('suggested limit') }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputMoney
            name="shareCapital"
            label={ t('social capital') }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 }>
          <CardRounded>
            <RevenuesTable
              disabled={ disabled }
              formRef={ formRef }
            />
          </CardRounded>
        </Grid>
        <Grid item sm={ 12 }>
          <CardRounded>
            <CommercialReferencesTable
              disabled={ disabled }
              formRef={ formRef }
            />
          </CardRounded>
        </Grid>
        <Grid item sm={ 12 }>
          <CardRounded>
            <BankReferencesTable
              disabled={ disabled }
              formRef={ formRef }
            />
          </CardRounded>
        </Grid>

        <Grid item sm={ 12 }>
          <CardRounded>
            <Scope path="counter">
              <Grid container spacing={ 1 }>
                <Grid item xs={ 12 }>
                  <I18n as={ Typography }
                    variant="h6"
                    color="primary"
                    params={ { howMany: 1 } }
                  >
                counter
                  </I18n>
                </Grid>
                <Grid item sm={ 12 } md={ 6 }>
                  <InputText
                    name="counter"
                    label={ t('name', { howMany: 1 }) }
                    readOnly={ disabled }
                  />
                </Grid>
                <Grid item sm={ 12 } md={ 3 }>
                  <InputPhone
                    name="counterPhone"
                    label={ t('phone', { howMany: 1 }) }
                    readOnly={ disabled }
                  />
                </Grid>
                <Grid item sm={ 12 } md={ 3 }>
                  <InputText
                    name="counterCrc"
                    label={ t('crc') }
                    readOnly={ disabled }
                  />
                </Grid>
              </Grid>

              <Grid item sm={ 12 }>
                <CounterPropertiesTable
                  disabled={ disabled }
                  formRef={ formRef }
                />
              </Grid>
            </Scope>
          </CardRounded>
        </Grid>

        <Grid item sm={ 12 }>
          <CardRounded>
            <CompanyHoldingParticipationTable
              disabled={ disabled }
              formRef={ formRef }
            />
          </CardRounded>
        </Grid>
      </Grid>
    </Scope>
  )
}

AdditionalInformation.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default AdditionalInformation
