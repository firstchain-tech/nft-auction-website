import { ComLayout } from '@/common/styled'
import styled, { css } from 'styled-components'

export const AuctionWrapper = styled(ComLayout)`
  min-height: calc(100vh - 17.88rem - 8.75rem);
  background: ${(props) => props.theme.bgColor2};
  .table_box_big {
    overflow-x: scroll;
    overflow-y: hidden;
    position: relative;
    height: calc(6 * 6.19rem);
  }
  .table_box {
    overflow: hidden;
    position: absolute;
  }
  .table_tbody_box {
    height: calc(5 * 6.19rem);
    overflow: scroll;
  }
`

export const AuctionReturn = styled.div`
  top: 4.31rem;
  position: relative;
  height: 2.5rem;
  font-size: 1.75rem;
  width: 30%;
  font-family: 'PingFang-SC-Regular';
  font-weight: 400;
  color: #545062;
  line-height: 2.5rem;
  span {
    margin-left: 0.63rem;
  }
  :hover {
    color: ${(props) => props.theme.themeColor};
  }
  ${(props) => props.theme.mediaWidth.screenMd`
    width: 50%;
    top: 2.13rem;
  `}
`

export const AuctionInfo = styled.div`
  width: 100%;
  min-height: 108.56rem;
  padding-bottom: 0.1rem;
  background: #ffffff;
  box-shadow: 0rem 1.94rem 1.88rem 0rem rgba(146, 159, 198, 0.1);
  border-radius: 1.88rem;
  top: 5.31rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  .auction-image,
  .ant-image {
    width: 100%;
    height: auto;
  }
  h1 {
    font-size: 3.75rem;
    font-family: 'Avenir-Bold', 'Avenir';
    font-weight: 900;
    color: ${(props) => props.theme.black2};
    line-height: 5.13rem;
    text-align: center;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        min-height: 88.56rem;
        h1 {
          font-size: 3rem;
          font-weight: 900;
          color: ${(props) => props.theme.black2};
          line-height: 4.13rem;
          margin-top: 3.44rem;
          margin-bottom: 1rem;
        }
      `,
    )}
`

export const AuctionContent = styled.div`
  width: 100%;
  min-height: 27.06rem;
  background: rgba(152, 148, 163, 0.05);
  padding: 2.81rem 12.94rem;
  h4 {
    font-size: 1.88rem;
    font-family: 'Avenir-Bold', 'Avenir';
    font-weight: 900;
    color: ${(props) => props.theme.black2};
    line-height: 2.56rem;
  }
  p {
    font-size: 1.25rem;
    font-family: 'PingFang-SC-Regular';
    font-weight: 400;
    color: ${(props) => props.theme.black};
    line-height: 1.75rem;
  }
  .buttom {
    display: flex;
    align-items: center;
    margin-top: 1.25rem;
    .ant-image,
    .ant-image-img {
      width: 4.63rem;
      height: 4.63rem;
    }
    span {
      margin-left: 1.44rem;
      font-size: 1.5rem;
      font-family: 'PingFang-SC-Semibold';
      font-weight: 600;
      color: #666666;
      line-height: 2.06rem;
    }
    span.themes {
      color: ${(props) => props.theme.themeColor};
    }
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        padding: 2.81rem 2.5rem;
      `,
    )}
`

export const AuctionData = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.81rem 12.94rem;
  width: 100%;
  .list {
    display: flex;
    flex-direction: column;
    h5 {
      font-size: 1.88rem;
      font-family: 'Avenir';
      font-weight: 800;
      color: ${(props) => props.theme.black2};
      line-height: 2.56rem;
    }
    .span {
      font-size: 3.63rem;
      font-family: 'DIN-Alternate-Bold';
      font-weight: bold;
      color: ${(props) => props.theme.themeColor};
      line-height: 4.19rem;
      span {
        font-size: 2rem;
        line-height: 2.31rem;
      }
    }
    .edition {
      font-size: 1.75rem;
      font-family: 'PingFang-SC-Semibold';
      font-weight: 600;
      color: #000000;
      line-height: 2.5rem;
      opacity: 0.5;
    }
    .tag {
      min-width: 8.88rem;
      height: 3.13rem;
      background: rgba(96, 35, 249, 0.1);
      border-radius: 1.56rem;
      line-height: 3.13rem;
      text-align: center;
      margin-top: 0.63rem;
      font-size: 1.63rem;
      font-family: 'PingFang-SC-Semibold';
      font-weight: 600;
      color: #5927ef;
    }
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        padding: 2.81rem 2.5rem;
      `,
    )}
`

export const AuctionBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5.63rem;
  p {
    font-size: 1.38rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 400;
    color: ${(props) => props.theme.black};
    line-height: 1.88rem;
    margin-top: 3.75rem;
    margin-bottom: 1.25rem;
    opacity: 0.5;
  }
  .ant-btn {
    min-width: 31.25rem;
    height: 5.63rem;
    background: ${(props) => props.theme.themeColor};
    border-radius: 2.81rem;
    font-size: 1.63rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 600;
    color: ${(props) => props.theme.white};
    line-height: 2.31rem;
  }

  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        p {
          margin-top: 1.75rem;
          margin-bottom: 1.25rem;
        }
      `,
    )}
`

export const OffersListDiv = styled.div`
  width: 100%;
  height: 45.63rem;
  background: #ffffff;
  box-shadow: 0rem 1.94rem 1.88rem 0rem rgba(146, 159, 198, 0.1);
  border-radius: 1.88rem;
`

export const OffersTitle = styled.div`
  font-size: 1.88rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 800;
  color: ${(props) => props.theme.black2};
  line-height: 2.56rem;
  padding: 2.38rem 0 1.63rem 0;
  text-align: center;
`

export const OffersTables = styled.div`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  thead {
    background: #f5f3f5;
    height: 6.19rem;
    border-bottom: 0.06rem solid rgba(0, 0, 0, 0.05);
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  tbody {
    display: block;
    height: calc(5 * 6.19rem);
    overflow-y: scroll;
    tr {
      height: 6.19rem;
      border-bottom: 0.06rem solid rgba(0, 0, 0, 0.05);
      display: table;
      width: 100%;
      table-layout: fixed;
    }
    .theme {
      font-family: 'Avenir-Bold', 'Avenir';
      font-weight: bold;
      color: ${(props) => props.theme.themeColor};
    }
    &::-webkit-scrollbar {
      width: 0.38rem;
      height: 0.06rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 0.31rem;
      -webkit-box-shadow: inset 0 0 0.31rem rgba(237, 241, 246, 0.2);
      background: #d8d8d8;
    }
    &::-webkit-scrollbar-track {
      border-radius: 0.31rem;
      background: transparent;
    }
  }
  tr {
    width: 100%;
    th {
      width: 20%;
      font-size: 1.5rem;
      font-family: 'Avenir-Bold', 'Avenir';
      font-weight: 900;
      word-break: keep-all;
      color: ${(props) => props.theme.black2};
    }
    td {
      width: 20%;
      text-align: center;
      font-size: 1.5rem;
      word-break: keep-all;
      font-family: 'Avenir';
      position: relative;
      font-weight: normal;
      color: ${(props) => props.theme.black2};
      &:nth-child(1) {
        font-size: 2.31rem;
        font-family: 'DIN-Alternate-Bold';
        font-weight: bold;
        opacity: 0.5;
      }
    }
  }
`

export const OffersTable = styled.table`
  width: 100%;
  thead {
    background: #f5f3f5;
    height: 6.19rem;
    border-bottom: 0.06rem solid rgba(0, 0, 0, 0.05);
    width: 100%;
  }
  tbody {
    tr {
      height: 6.19rem;
      border-bottom: 0.06rem solid rgba(0, 0, 0, 0.05);
    }
    .theme {
      font-family: 'Avenir-Bold', 'Avenir';
      font-weight: bold;
      color: ${(props) => props.theme.themeColor};
    }
  }
  tr {
    width: 100%;
    min-width: calc(5 * 16.38rem);
    th {
      width: 20%;
      font-size: 1.5rem;
      min-width: 16.38rem;
      font-family: 'Avenir-Bold', 'Avenir';
      font-weight: 900;
      word-break: keep-all;
      color: ${(props) => props.theme.black2};
    }
    td {
      width: 20%;
      text-align: center;
      min-width: 16.38rem;
      font-size: 1.5rem;
      word-break: keep-all;
      font-family: 'Avenir';
      position: relative;
      font-weight: normal;
      color: ${(props) => props.theme.black2};
      &:nth-child(1) {
        font-size: 2.31rem;
        font-family: 'DIN-Alternate-Bold';
        font-weight: bold;
        opacity: 0.5;
      }
    }
  }
`

export const TableHight = styled.div`
  min-width: 7.06rem;
  height: 2.13rem;
  background: rgba(96, 35, 249, 0.1);
  border-radius: 1.38rem;
  position: absolute;
  right: -2.5rem;
  top: calc(50% - 1.065rem);
  font-size: 1rem;
  font-family: 'PingFang-SC-Semibold';
  font-weight: 600;
  line-height: 2.13rem;
  color: ${(props) => props.theme.themeColor};
`

export const ModalContent = styled.div`
  padding: 0 4.56rem;
  position: relative;
  &::after {
    content: '';
    height: 17.19rem;
    background: rgba(152, 148, 163, 0.05);
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .ant-form {
    position: relative;
    z-index: 1;
  }
  .form-price,
  .ant-input-wrapper,
  input {
    height: 5rem;
    border-radius: 2.75rem;
    border-color: #c8c8d9;
    font-size: 1.81rem;
    font-family: 'PingFang-SC-Regular';
    font-weight: 400;
    color: ${(props) => props.theme.black2};
    line-height: 2.56rem;
    width: 100%;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
  .ant-input-group-addon {
    font-size: 1.75rem;
    font-family: 'Avenir-Bold', 'Avenir';
    font-weight: 900;
    color: ${(props) => props.theme.black2};
    line-height: 2.38rem;
  }
  p {
    font-size: 1.38rem;
    font-family: 'PingFang-SC-Regular';
    font-weight: 400;
    color: ${(props) => props.theme.black};
    line-height: 1.88rem;
    text-align: center;
    opacity: 0.5;
  }
  .submit-btn {
    width: 100%;
    height: 5rem;
    background: #5927ef;
    border-radius: 2.5rem;
    font-size: 1.5rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 600;
    color: #ffffff;
  }
`

export const ModalLable = styled.div`
  font-size: 1.75rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 800;
  color: ${(props) => props.theme.black2};
  line-height: 2.38rem;
  text-align: center;
  padding: 2.5rem 0 1.31rem 0;
`

export const ModalTitles = styled.div`
  margin-top: 1.75rem;
  margin-bottom: 2.5rem;
  font-size: 1.25rem;
  font-family: 'PingFang-SC-Regular';
  font-weight: 400;
  color: #000000;
  line-height: 1.75rem;
  .theme {
    font-family: 'DIN-Alternate-Bold';
    font-weight: bold;
    margin-left: 1.38rem;
    color: #5927ef;
  }
`
