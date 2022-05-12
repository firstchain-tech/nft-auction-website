import styled, { css } from 'styled-components'

export const RewardModalWrapper = styled.div`
  padding-bottom: 0.01rem;
  margin-top: 8.19rem;
`

export const RewardModalContent = styled.div`
  width: 100%;
  min-height: 50.5rem;
  background: ${(props) => props.theme.white};
  box-shadow: 0rem 1.94rem 1.88rem 0rem rgba(146, 159, 198, 0.1);
  border-radius: 1.88rem;
  margin-bottom: calc(8.75rem + 5.63rem);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-image {
    position: absolute;
    top: -5.63rem;
    width: calc(100% - 12rem);
    left: 6rem;
    z-index: 1;
    height: 29.5rem;
    border-radius: 2rem;
    box-shadow: 0 0.19rem 0.38rem -0.25rem rgba(0, 0, 0, 0.12), 0 0.38rem 1rem 0 rgba(0, 0, 0, 0.08),
      0 0.56rem 1.75rem 0.5rem rgba(0, 0, 0, 0.05);
  }
  .Reward-image {
    width: 100%;
    height: 100%;
    border-radius: 2rem;
  }
  h5 {
    font-size: 1.75rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 600;
    color: ${(props) => props.theme.black};
    line-height: 2.5rem;
  }
  .reward-btn {
    min-width: 31.25rem;
    height: 5.63rem;
    border-radius: 2.81rem;
    font-size: 1.63rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 600;
    margin-top: 3.75rem;
    margin-bottom: 5.63rem;
  }
  .ant-form {
    .ant-form-item-explain-error {
      font-weight: bold;
    }
    .ant-form-item {
      margin-bottom: 2.13rem !important;
    }
    width: calc(100% - 12rem);
    label {
      &::after,
      &::before {
        content: none !important;
      }
    }
    .reward-form-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ant-form-item-label {
      text-align: start;
      line-height: 6rem;
    }
    .form-email {
      height: 6rem;
      border-radius: 3rem;
      position: relative;
      height: 6rem;
      font-size: 1.5rem;
      font-family: 'PingFang-SC-Semibold';
      font-weight: 400;
      color: ${(props) => props.theme.black2};
    }
    .form-address {
      height: 6rem;
      border-radius: 3rem;
      position: relative;
      font-size: 1.5rem;
      font-family: 'PingFang-SC-Semibold';
      font-weight: 400;
      color: ${(props) => props.theme.black2};
      .ant-btn {
        position: absolute;
        right: calc(2.5rem - 1.19rem);
        top: calc(50% - 1.69rem);
        min-width: 8.06rem;
        height: 3.63rem;
        border-radius: 2.19rem;
        font-size: 1.25rem;
        text-indent: 0;
        font-family: 'PingFang-SC-Semibold';
        font-weight: 600;
        color: ${(props) => props.theme.white};
      }
    }
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        min-height: 50.5rem;
        margin-bottom: calc(8.75rem);
        .ant-image {
          width: calc(100% - 3rem);
          left: 1.5rem;
          height: 16.06rem;
        }
        .ant-form {
          width: calc(100% - 3rem);

          .form-address-h5 {
            height: auto !important;
            .ant-btn {
              top: 8rem;
            }
          }
        }
      `,
    )}
`
export const SpanTitle = styled.div`
  font-size: 1.75rem;
  font-family: 'PingFang-SC-Semibold';
  font-weight: 600;
  color: ${(props) => props.theme.black2};
  line-height: 2.5rem;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 1.63rem;
      `,
    )}
`

export const RewardTile = styled.div`
  font-size: 3.13rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 900;
  color: ${(props) => props.theme.black2};
  line-height: 4.25rem;
  margin-bottom: 0.63rem;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 2.81rem;
        line-height: 3.81rem;
        margin-bottom: 0.75rem;
      `,
    )}
`

export const RewardInfo = styled.div`
  font-size: 1.75rem;
  font-family: 'PingFang-SC-Semibold';
  font-weight: 400;
  color: ${(props) => props.theme.black};
  line-height: 2.5rem;
  opacity: 0.5;
  text-align: center;
  margin-bottom: 5rem;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 1.38rem;
        overflow: hidden;
        width: 95%;
        text-overflow: ellipsis;
        white-space: nowrap;
      `,
    )}
`
