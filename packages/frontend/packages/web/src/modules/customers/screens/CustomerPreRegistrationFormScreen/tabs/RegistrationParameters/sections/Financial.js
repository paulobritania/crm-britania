import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { Scope } from '@britania-crm/forms'
import { useT } from '@britania-crm/i18n'
import InputNumber from '@britania-crm/web-components/InputNumber'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

const Financial = ({ disabled }) => {
  const t = useT()

  return (
    <Scope path="financial">
      <Grid container spacing={ 1 }>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="issueBankSlip"
            options={ [{
              name: t('issue bank slip'),
              id: true
            }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="gerenatesDebitNotice"
            options={ [{
              name: t('generates debit notice'),
              id: true
            }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="calculatesFine"
            options={ [{
              name: t('calculates fine'),
              id: true
            }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="receives_nfe"
            options={ [{
              name: t('receives nfe'),
              id: true
            }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="simpleClient"
            options={ [{
              name: t('simple client'),
              id: true
            }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <RadioGroup
            name="receivesSciInformation"
            options={ [{
              name: t('receives sci information'),
              id: true
            }] }
            clearable
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } />
        <Grid item sm={ 12 } md={ 3 }>
          <InputNumber
            name="standardIncome"
            label={ t('standard income') }
            disabled={ disabled }
            maxLength={ 6 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputNumber
            name="carrier"
            label={ t('carrier') }
            disabled={ disabled }
            maxLength={ 9 }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputNumber
            name="bankInstruction"
            label={ t('bank instruction') }
            disabled={ disabled }
            maxLength={ 6 }
          />
        </Grid>
      </Grid>
    </Scope>
  )
}

Financial.propTypes = {
  // formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default Financial
