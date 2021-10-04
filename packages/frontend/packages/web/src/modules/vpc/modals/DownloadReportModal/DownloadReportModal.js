import React, {
  useCallback,
  useRef,
  useMemo,
  useState
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import vpcReportSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.report.schema'
import I18n from '@britania-crm/i18n'
import { vpc as vpcCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { FileActions } from '@britania-crm/stores/file'
import { generateParamsUrl } from '@britania-crm/utils/generateParamsUrl'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import Modal from '@britania-crm/web-components/Modal'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

const DownloadReportModal = (props) => {
  const {
    id,
    open,
    handleClose,
    selectedItens,
    filters
  } = props

  const formRef = useRef(null)
  const dispatch = useCallback(useDispatch(), [])

  const [downloadLoading, setDownloadLoading] = useState(false)

  const downloadOptionMock = useMemo(() =>
    [
      { id: 'synthetic', name: 'Sintético' },
      { id: 'analytical', name: 'Analítico' }
    ],
  [])

  const handleSubmit = useCallback(
    (values) => {
      setDownloadLoading(true)
      let ids = (map(selectedItens, 'id'))
      ids = ids.join(',')

      dispatch(FileActions.download(
        `${ vpcCrmRoutes.download }/${ values.reportOption }?${ generateParamsUrl({ ...filters, ids }) }`,
        'Relátorio.xlsx',
        handleClose
      ))
    },
    [dispatch, filters, handleClose, selectedItens]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="xs"
      variant="space"
      escape={ !downloadLoading }
      loading={ downloadLoading }
      fullWidth
      FooterComponent={ () => (
        <>
          <I18n as={ Button }
            onClick={ handleClose }
            color="secondary"
            variant="outlined"
            disabled={ downloadLoading }
          >
            cancel
          </I18n>
          <I18n as={ Button }
            onClick={ () => formRef.current.submit() }
            color="secondary"
            style={ { marginLeft: 10 } }
            disabled={ downloadLoading }
          >
            datagrid toolbar export title
          </I18n>
        </>
      ) }
    >
      <Form
        ref={ formRef }
        onSubmit={ handleSubmit }
        schemaConstructor={ vpcReportSchema }
        defaultValues={ INITIAL_VALUES }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 } md={ 12 }>
            <RadioGroup
              name="reportOption"
              options={ downloadOptionMock }
            />
          </Grid>

        </Grid>
      </Form>
    </Modal>
  )
}

DownloadReportModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  selectedItens: PropTypes.array.isRequired
}
export default DownloadReportModal
