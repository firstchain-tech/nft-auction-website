import styled, { css } from 'styled-components'

export const ComLayout = styled.div`
  padding: 0 22.5rem 0;
  @media (max-width: 1700px) {
    padding: 0 9rem 0;
  }
  @media (max-width: 1500px) {
    padding: 0 6rem 0;
  }
  @media (max-width: 1400px) {
    padding: 0 3.5rem 0;
  }
  @media (max-width: 1300px) {
    padding: 0 2rem 0;
  }
  ${(props) =>
    props.theme.mediaWidth.screenLg(
      () => css`
        padding: 0 2.5rem 0;
      `,
    )}
`
