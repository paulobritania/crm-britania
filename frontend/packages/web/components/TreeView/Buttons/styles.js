import styled from 'styled-components'

import colors from '@britania-crm/styles/colors'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  /* position: absolute; */
  top: ${ (props) => props.top + 20 }px;

  height: ${ (props) => props.hasTasks ? 'auto' : '100%' };
  width: 100%;
  grid-gap: 10px;

  > * {
    margin: 0 10px;
  }

  button {
    font-size: 14px;
    padding: 0 50px;
    height: 30px;
    margin-top: 10px;
  }
`

export const NoTasksText = styled.span`
  font-size: 14 px;
  color: ${ colors.britPrimary1.light };
`

export const TaskButtonContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: ${ (props) => props.hasTasks ? '0' : '-50px' };

  button {
    margin-top: 20px;
  }
`
