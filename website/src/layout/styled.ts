import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.bgColor1};
  /* background: ${(props) => props.theme.bgColor1};
  max-width: min(120rem, 100% - 0rem);
  margin: 0 auto; */
  .layout-tabber {
    position: fixed;
    z-index: 10;
    width: 100%;
    background: ${(props) => props.theme.bgColor1};
  }
  .layout-footer {
    width: 100%;
    background: ${(props) => props.theme.bgColor1};
  }
`

export const LayoutContent = styled.div`
  min-height: calc(100vh - 17.88rem - 8.75rem);
  padding-top: 8.75rem;
`
