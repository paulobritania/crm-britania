
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'

import { AttachFile } from '@material-ui/icons'

import colors from '@britania-crm/styles/colors'

export const StyledRichTextEditor = styled(ReactQuill)`
     .ql-toolbar.ql-snow{
      border: none !important;
    }
     .ql-container {
      border: none !important;
      height: 184px;

       .ql-editor {
        background: ${ colors.white2 };
        border: 2px solid ${ colors.primary.main };
        border-radius: 16px;
        transition: 300ms;

        &:not(.ql-blank), &.ql-blank:focus {
          background: ${ colors.white };
          border-color: ${ colors.primary.main };

          &::before {
            background-color: ${ colors.white };
            color: ${ colors.primary.main };
            height: 3px;
            line-height: 1px;
            margin-top: 6px;
            padding: 0 5px;
            transform: translate(16px, -6px) scale(0.75);
            transform-origin: top left;
          }
        }

        &::before {
          content: attr(data-placeholder);
          display: block;
          font-style: normal;
          left: 0;
          position: absolute;
          right: auto;
          top: 0;
          transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
          transform: translate(16px, 12px) scale(1);
          z-index: 1;
        }
      }
    }
`
export const ErrorMessage = styled.p`
    color: ${ colors.error.main };
`
export const StyledAttachFile = styled(AttachFile)`
  &.MuiSvgIcon-root {
    font-size: 16px;
  }
`
