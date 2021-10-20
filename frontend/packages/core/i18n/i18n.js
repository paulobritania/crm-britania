import { ptBR } from '@meta-awesome/i18n'
import I18n, {
  I18nProvider,
  useT,
  withT
} from '@meta-react/i18n'

import localPtBR from './translations/pt-BR'

const dictionaries = { 'pt-BR': { ...ptBR, ...localPtBR } }

export {
  dictionaries,
  I18nProvider,
  useT,
  withT
}

export default I18n
