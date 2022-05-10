import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.bgColor1};
  .layout-tabber {
    position: fixed;
    z-index: 10;
    width: 100%;
    background: ${(props) => props.theme.bgColor1};
  }
`

export const LayoutContent = styled.div`
  min-height: calc(100vh - 17.88rem - 8.75rem);
  padding-top: 8.75rem;
`
