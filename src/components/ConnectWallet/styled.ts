import { Row } from 'antd'
import styled, { css } from 'styled-components'

export const ConnectWalletWrapper = styled.div``

export const ModalTitle = styled.div`
  font-size: 1.13rem;
  font-family: 'Avenir';
  font-weight: 500;
  color: #000000;
  line-height: 1.88rem;
`

export const NoChainIdTips = styled.div`
  position: fixed;
  top: 8.75rem;
  left: 0;
  width: 100%;
  z-index: 2;
  line-height: 3.38rem;
  height: 3.38rem;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  align-items: center;
  background: ${({ theme }) => `${theme.themeColor}`};
  color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mediaWidth.screenMd`
    top: 5.5rem;
    height: 4.38rem;
  `}
`

export const WalletTitleAddress = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  position: relative;
  line-height: 8.75rem;
  height: 8.75rem;
  padding-left: 3.13rem;
  /* left: -3.13rem; */
  min-width: 7.13rem;
  span {
    font-size: 1.25rem;
    font-family: 'PingFang-SC-Regular';
    font-weight: 600;
    color: ${(props) => props.theme.white};
  }
  .ant-image,
  .ant-image-img {
    width: 3.63rem;
    height: 3.63rem;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        position: relative;
        padding-left: 1.5rem;
        left: -1.5rem;
        min-width: 4.13rem;
      `,
    )}
`

export const DrawerTitle = styled.div`
  font-size: 1.75rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 900;
  color: ${(props) => props.theme.black2};
  line-height: 3.25rem;
`

export const WalletInitDiv = styled(Row)`
  margin-top: 2.5rem;
  background: ${(props) => props.theme.white};
  border-radius: 1.25rem;
  border: 0.06rem solid ${(props) => props.theme.line};
  .ant-col {
    height: 5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    .ant-image {
      margin-left: 1.88rem;
      margin-right: 1.75rem;
    }
    &:nth-child(1) {
      border-bottom: 0.06rem solid ${(props) => props.theme.line};
    }
    .choose-span {
      font-size: 1.13rem;
      font-family: 'Avenir-Bold', 'Avenir';
      font-weight: 900;
      color: ${(props) => props.theme.black2};
    }
  }
`

export const WalletLoginOutModal = styled.div`
  position: absolute;
  top: 8.75rem;
  right: -1.06rem;
  width: 13.56rem;
  height: 5rem;
  background: ${(props) => props.theme.white};
  box-shadow: 0rem 1.75rem 1.69rem 0rem rgba(146, 159, 198, 0.1);
  border-radius: 0.69rem;
  font-size: 1.63rem;
  font-family: 'Avenir';
  font-weight: 800;
  color: ${(props) => props.theme.black};
  text-align: center;
  line-height: 5rem;
  cursor: pointer;
  z-index: 11;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        right: 0;
      `,
    )}
`

export const WalletLoginOutMask = styled.div`
  width: 100%;
  height: calc(100vh - 8.75rem);
  background: ${(props) => props.theme.black};
  opacity: 0.4;
  position: fixed;
  left: 0;
  top: 8.75rem;
  z-index: 9;
`

export const NoCopyTips = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 10.06rem;
  left: 0;
  background: #ffffff;
  box-shadow: 0rem -1.94rem 1.88rem 0rem rgba(0, 0, 0, 0.49);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2.5rem;
  .tips {
    font-size: 1.75rem;
    font-family: 'Avenir-Bold', 'Avenir';
    font-weight: 900;
    color: #333333;
    line-height: 2.38rem;
  }
  .ant-btn {
    font-family: 'PingFang-SC-Semibold';
  }
`
