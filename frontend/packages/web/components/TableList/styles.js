import styled from 'styled-components'

export const Table = styled.table`
  border-collapse: collapse;

  tr {
    width: 100% !important;
    cursor: pointer;

    &:first-child {
      padding-top: 10px;
    }
  }

  th {
    display: flex !important;
    flex: 1;
    text-align: left;
    padding: 16px 0px;
    align-items: center !important;
    color: #0D436F;
    white-space: nowrap;

    > span {
      display: flex;
      width: 12px;
      height: 24px;
      justify-content: center;
      align-items: center; 
      margin-left: 4px;
    }

    &.userimg {
      max-width: 75px !important;
      pointer-events: none;
      cursor: normal;
      padding-left: 10px;

      > span {
        pointer-events: none;
        opacity: 0;
        cursor: normal;
      }
    }

    &.actions {
      pointer-events: none;
      cursor: normal;

      > span {
        pointer-events: none;
        opacity: 0;
        cursor: normal;
      }
    }

    &:last-child {
      text-align: end;
      justify-content: flex-end;
    }
  }

  td {
    display: flex;
    flex: 1;
    padding: 16px 0px;

    &:last-child {
      text-align: end;
    }
  }
`
