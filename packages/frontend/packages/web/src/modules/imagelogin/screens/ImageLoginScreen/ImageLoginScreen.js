import React, {
  useCallback,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import I18n, { useT } from '@britania-crm/i18n'
import {
  uploadFile,
  getFile,
  setDefaultImage
} from '@britania-crm/services/apis/crmApi/resources/administration.service'
import Button from '@britania-crm/web-components/Button'
import Checkbox from '@britania-crm/web-components/Checkbox'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import Upload from '@britania-crm/web-components/Upload'

import {
  PageWrapper,
  FooterContainer,
  InfoContainer,
  useStyles
} from './styles'

const ImageLoginScreen = () => {
  const t = useT()
  const classes = useStyles()
  const history = useHistory()

  const [checked, setChecked] = useState(false)
  const [makeUpload, setMakeUpload] = useState(false)
  const [makeDelete, setMakeDelete] = useState(false)
  const [showChecked, setShowChecked] = useState(true)
  const [hasFile, setHasFile] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  const handleSave = useCallback(() => {
    if (checked) {
      setMakeDelete(true)
      setMakeUpload(false)
    } else {
      setShowChecked(false)
      setMakeDelete(false)
      setMakeUpload(true)
    }
  }, [checked])

  const handleDefaultImageCheckboxChange = useCallback(
    async (event) => {
      const { checked: ch } = event.target
      setChecked(!!ch)
    },
    []
  )

  return (
    <PageWrapper>
      <Card classes={ { root: classes.card } }>
        <CardContent classes={ { root: classes.cardContent } }>
          <Grid item xs={ 12 } className={ classes.header }>
            <I18n as={ Button } color="secondary" variant="outlined" onClick={ history.goBack } >
            back
            </I18n>
            <I18n as={ Typography } variant="h6" className={ classes.title } >
            login image
            </I18n>
          </Grid>
          <Grid item xs={ 12 }>
            <Upload
              showsDefault={ checked }
              isPreview={ (value) => setIsPreview(value) }
              uploadFile={ uploadFile }
              deleteFile={ setDefaultImage }
              getFile={ getFile }
              hasFile={ (value) => setHasFile(value) }
              makeUpload={ makeUpload }
              makeDelete={ makeDelete }
              handleClose={ () => history.go(0) }
            />
            {
              showChecked && (
                <FooterContainer>
                  <InfoContainer>
                    <InfoIcon/>
                    A proporção ideal para sua imagem é 16:9
                  </InfoContainer>
                  <Checkbox
                    detached
                    disabled={ !hasFile }
                    checked={ checked }
                    onChange={ handleDefaultImageCheckboxChange }
                    name="defaultLoginImage"
                    color="primary"
                    label={ t('login image use default') }
                  />
                </FooterContainer>
              )
            }
          </Grid>
        </CardContent>
        <CardActions>
          <Grid item xs={ 12 } className={ classes.buttons }>
            <I18n as={ Button }
              color="secondary"
              variant="outlined"
              onClick={ () => history.go(0) }
              className={ classes.btnCancel }
              disabled={
                (!checked && !hasFile) ||
                  (!checked && hasFile && !isPreview)
              }
            >
            cancel
            </I18n>
            <I18n as={ Button }
              disabled={
                (!checked && !hasFile) ||
                  (!checked && hasFile && !isPreview)
              }
              className={ classes.saveChangesButton }
              onClick={ handleSave }
            >
            login image save
            </I18n>
          </Grid>
        </CardActions>
      </Card>

    </PageWrapper>
  )
}

export default ImageLoginScreen
