import styled, { css } from 'styled-components'

export const AuctionModalWrapper = styled.div`
  position: relative;
  padding-bottom: 0.01rem;
  z-index: 2;
`

export const AuctionModalContent = styled.div`
  width: 100%;
  min-height: 57.5rem;
  background: ${(props) => props.theme.white};
  box-shadow: 0rem 1.94rem 1.88rem 0rem rgba(146, 159, 198, 0.1);
  border-radius: 1.88rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  .ant-image {
    position: absolute;
    top: -5.63rem;
    width: calc(100% - 12rem);
    left: 6rem;
    z-index: 1;
    height: 24.75rem;
    border-radius: 1.88rem;
    box-shadow: 0 0.19rem 0.38rem -0.25rem rgba(0, 0, 0, 0.12), 0 0.38rem 1rem 0 rgba(0, 0, 0, 0.08),
      0 0.56rem 1.75rem 0.5rem rgba(0, 0, 0, 0.05);
  }
  .auction-image {
    width: 100%;
    height: 100%;
    border-radius: 1.88rem;
    object-fit: cover;
  }
  h4 {
    font-size: 1.75rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: bold;
    color: ${(props) => props.theme.black};
    line-height: 2.5rem;
    margin-bottom: 0.44rem;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        min-height: 50.5rem;
        margin-bottom: 0;
        .ant-image {
          width: calc(100% - 3rem);
          left: 1.5rem;
          height: 16.06rem;
        }
      `,
    )}
`

export const AuctionTile = styled.div`
  font-size: 3.13rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 900;
  color: ${(props) => props.theme.black2};
  line-height: 4.25rem;
  margin-bottom: 2.5rem;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 2.81rem;
        line-height: 3.81rem;
        margin-bottom: 1.75rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 95%;
        text-align: center;
      `,
    )}
`

export const AuctionH2 = styled.h2`
  font-size: 3.63rem;
  font-family: 'DIN-Alternate-Bold';
  font-weight: bold;
  color: ${(props) => props.theme.themeColor};
  line-height: 4.19rem;
  margin-bottom: 1.25rem;
  span {
    font-size: 2rem;
    font-weight: bold;
    line-height: 2.31rem;
  }
`

export const AuctionEdition = styled.div`
  font-size: 1.75rem;
  font-family: 'PingFang-SC-Semibold';
  font-weight: 600;
  color: ${(props) => props.theme.black};
  line-height: 2.5rem;
  opacity: 0.5;
  margin-bottom: 1rem;
`

export const AuctionTimes = styled.div`
  min-width: 31.25rem;
  height: 5.63rem;
  background: rgba(96, 35, 249, 0.1);
  border-radius: 2.81rem;
  text-align: center;
  line-height: 5.63rem;
  font-size: 1.63rem;
  font-family: 'PingFang-SC-Semibold';
  font-weight: 600;
  color: ${(props) => props.theme.themeColor};
  padding: 0 3.88rem;
  margin-top: 2.25rem;
  margin-bottom: 5.63rem;
  span {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 0;
    .span {
      margin-right: 1.5rem;
    }
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 1.38rem;
        padding: 0 2.88rem;
        height: auto;
        min-height: 5.63rem;
        line-height: 3rem;
        max-width: calc(100% - 8.25rem);
        min-width: auto;
        margin-bottom: 5rem;
        span {
          .span {
            margin-right: 0.8rem;
          }
        }
      `,
    )}
`
