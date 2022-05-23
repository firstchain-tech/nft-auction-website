import styled, { css } from 'styled-components'

export const RoadmapModalWrapper = styled.div`
  position: relative;
  height: auto;
  margin-top: 3.81rem;
  &::after {
    content: '';
    width: 0.06rem;
    height: calc(100% - 1.81rem);
    background: #7a4eff;
    position: absolute;
    left: 0;
    top: 1.81rem;
  }
`

export const RoadmapModalTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.81rem;
  position: relative;
  margin-bottom: 2.06rem;
  h3 {
    font-size: 2.06rem;
    font-family: 'Avenir';
    font-weight: 900;
    color: #7a4eff;
    line-height: 2.25rem;
    margin-bottom: 0;
  }
  span {
    margin-left: 2.5rem;
    font-size: 1.75rem;
    font-family: 'Avenir';
    font-weight: 900;
    color: #8c8b94;
    line-height: 2.25rem;
    margin-bottom: 0;
  }
  h5 {
    font-size: 1.75rem;
    font-family: 'Avenir-Bold';
    font-weight: 900;
    color: #fff;
    line-height: 2.25rem;
    margin-bottom: 0;
  }
  &::after {
    content: '';
    width: 0.94rem;
    height: 0.94rem;
    background: #7a4eff;
    border-radius: 50%;
    position: absolute;
    left: calc(-1.81rem - 0.47rem);
    top: 0.44rem;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        display: block;
        span {
          margin-left: 0;
        }
      `,
    )}
`

export const RoadmapModalContent = styled.ul`
  list-style-type: circle;
  margin-bottom: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0rem;
  margin-inline-end: 0rem;
  padding-inline-start: 0;
  margin-left: 3.69rem;
  li {
    font-size: 1.5rem;
    font-family: 'Avenir';
    font-weight: 500;
    color: rgba(255, 255, 255, 0.4);
    line-height: 2.25rem;
    &::marker {
      color: rgba(255, 255, 255, 0.6);
      font-size: 2rem;
      line-height: 2.25rem;
    }
  }
`
