import React, {
  useRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import rankingSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/ranking.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  ranking,
  clients
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import useEffectOnlyDidUpdate from '@britania-crm/utils/useEffectOnlyDidUpdate'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputSelect from '@britania-crm/web-components/InputSelect'
import Modal from '@britania-crm/web-components/Modal'
import RankingBadge from '@britania-crm/web-components/RankingBadge'
import TextArea from '@britania-crm/web-components/TextArea'

import useStyles, { ButtonContainer } from '../styles'

const RankingChangeModal = ({
  id, open, handleClose, onSuccess, matrixCode
}) => {
  const classes = useStyles()
  const t = useT()
  const formRef = useRef(null)
  const { data: suggestionRanking } = useCrmApi(clients.getRankingSuggestionUrl.replace(':clientTotvsCode', matrixCode))
  const { data: rankingOptions } = useCrmApi(ranking.getRankingsRankings)

  useEffectOnlyDidUpdate(() => {
    formRef.current.setData({
      rankingId: suggestionRanking?.rankingId,
      justification: suggestionRanking?.justification || ''
    })
  },
  [suggestionRanking])

  const handleSubmit = useCallback(
    async (values) => {
      await onSuccess(values)
      handleClose()
    }, [handleClose, onSuccess]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('ranking change') }
      maxWidth="md"
      fullWidth
      escapeWhenLoading
      FooterComponent={ () => (
        <ButtonContainer>
          <Button
            color="secondary"
            variant="outlined"
            onClick={ () => {
              handleClose()
              formRef.current.reset()
            }
            }
          >
            <I18n>cancel</I18n>
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={ () => formRef.current.submit() }
          >
            <I18n>save</I18n>
          </Button>
        </ButtonContainer>
      ) }
    >
      <Form
        ref={ formRef }
        onSubmit={ handleSubmit }
        schemaConstructor={ rankingSchema }
        defaultValues={ INITIAL_VALUES }
      >
        <Grid container item sm={ 12 } spacing={ 1 } >
          <Grid item sm={ 12 } className={ classes.ranking }>
            <I18n as={ Typography } variant="body2" >
            system suggestion
            </I18n>
            <RankingBadge type={ suggestionRanking?.alias } />
          </Grid>
          <Grid item sm={ 12 }>
            <InputSelect
              name="rankingId"
              label={ t('new ranking suggestion') }
              required
              options={ rankingOptions }
              valueKey="description"
            />
          </Grid>
          <Grid item sm={ 12 }>
            <TextArea
              name="justification"
              label={ t('justification') }
              rows={ 10 }
              inputProps={ { maxLength: 1000 } }
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

RankingChangeModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  matrixCode: PropTypes.number.isRequired
}

RankingChangeModal.defaultProps = {
  user: {},
  onSuccess () {},
  currentRoutePermissions: {}
}

export default RankingChangeModal
