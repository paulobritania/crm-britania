import { Form as Unform } from '@unform/web'
import styled from 'styled-components'

import { FormProvider } from '@britania-crm/forms'

export const StyledForm = styled(FormProvider).attrs({ UnformComponent: Unform })`
  display: flex;
  flex-direction: column;
`
