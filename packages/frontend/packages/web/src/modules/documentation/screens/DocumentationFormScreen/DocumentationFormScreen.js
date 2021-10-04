import React, {
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState
} from 'react'
import { useDispatch } from 'react-redux'
import {
  useHistory,
  useLocation
} from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useFormEffect } from '@britania-crm/forms'
import documentationSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/documentation/documentation.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { documents as documentsCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { DocumentsActions } from '@britania-crm/stores/documents'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputText from '@britania-crm/web-components/InputText'
import { CircularLoader } from '@britania-crm/web-components/Loader'
import TextArea from '@britania-crm/web-components/TextArea'
import UploadImage from '@britania-crm/web-components/UploadImage'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import useStyles from './styles'

const DocumentationFormScreen = () => {
  const t = useT()
  const classes = useStyles()
  const { routes } = useRoutes()
  const dispatch = useCallback(useDispatch(), [])
  const history = useHistory()

  const { state } = useLocation()
  const formRef = useRef(null)

  const { data: documentFromApi, loading } = useCrmApi(state?.params?.alias ? [`${ documentsCrmRoutes.getOne }/${ state?.params?.alias }`, state] : null)

  const [loader, setLoader] = useState(false)
  const [title, setTitle] = useState()
  const [file, setFile] = useState()

  const mode = useMemo(() => state?.params?.mode, [state])
  const isEdit = useMemo(() => mode === 'edit', [mode])

  const pageTitle = useMemo(() => {
    switch (mode) {
      case 'edit':
        return t('editing {this}', { this: t('document', { howMany: 1 }) })
      default:
        return t('new {this}', { gender: 'male', this: t('document', { howMany: 1 }) })
    }
  }, [mode, t])

  const onSuccessCallBack = useCallback(
    () => {
      history.push(routes.documentation.path)
      setLoader(false)
    }
    ,
    [history, routes.documentation.path]
  )

  const handleSubmit = useCallback(
    (values) => {
      if (isEdit) {
        const updatedDocument = {
          title: values.title,
          observation: values.observation,
          file: values.file && !values.file.id ? values.file : null,
          alias: 'PRE_CAD_CLIENTE_DOCUMENTACAO'
        }
        dispatch(DocumentsActions.updateDocument(updatedDocument, onSuccessCallBack, () => setLoader(false)))
      } else {
        const newDocument = {
          title: values.title,
          observation: values.observation,
          file: values.file,
          alias: 'PRE_CAD_CLIENTE_DOCUMENTACAO'
        }
        dispatch(DocumentsActions.createDocument(newDocument, onSuccessCallBack, () => setLoader(false)))
      }
    },
    [dispatch, isEdit, onSuccessCallBack]
  )

  useEffect(() => {
    if (!state?.params?.alias && mode !== 'create') history.replace(routes.documentation.path)
  },
  [history, mode, routes.documentation.path, state]
  )

  useFormEffect(() => {
    if (!isEmpty(documentFromApi)) {
      formRef.current.setData({
        title: documentFromApi.title,
        observation: documentFromApi.observation,
        file: {
          ...documentFromApi.file,
          type: documentFromApi.file.contentType
        }
      })
    }
  }, [documentFromApi])

  return (
    <Form
      ref={ formRef }
      onSubmit={ handleSubmit }
      schemaConstructor={ documentationSchema }
      defaultValues={ INITIAL_VALUES }
    >
      {(loader || loading) && <CircularLoader/>}
      <Grid container spacing={ 2 } className={ classes.container } >
        <Grid item className={ classes.header } sm={ 12 }>
          <Typography className={ classes.title } variant="h4" gutterBottom >
            {pageTitle}
          </Typography>
        </Grid>

        <Grid item sm={ 12 } md={ 6 }>
          <InputText
            name="title"
            label={ t('title') }
            onValueChange={ setTitle }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 12 } >
          <TextArea
            name="observation"
            label={ t('guidelines') }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 12 } className={ classes.upload }>
          <UploadImage
            name="file"
            preview
            hideWhenHasValue
            types={ ['image/jpg', 'image/jpeg', 'application/pdf'] }
            previewStyle={ { width: 200, height: 200 } }
            onValueChange={ setFile }
            title={ t('add the file') }
            description={ t('the {this} or', { gender: 'male', this: t('archive', { howMany: 3 }) }) }
            clearable
          />
        </Grid>
        <Grid item xs={ 12 } className={ classes.buttons }>
          <Grid>
            <I18n
              as={ Button }
              className={ classes.resetBtn }
              disabled={ loader }
              color="secondary"
              variant="text"
              onClick={ () => formRef.current.reset() }
            >
                clean
            </I18n>
          </Grid>
          <Grid>

            <I18n
              as={ Button }
              variant="outlined"
              color="secondary"
              disabled={ loader }
              onClick={ () => history.push(routes.documentation.path) }
            >
              cancel
            </I18n>
            <I18n as={ Button }
              color="secondary"
              variant="contained"
              disabled={ !file || !title }
              className={ classes.btnSave }
              isLoading={ loader }
              onClick={ () => formRef.current.submit() }
            >
              finish registration
            </I18n>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}

export default DocumentationFormScreen
