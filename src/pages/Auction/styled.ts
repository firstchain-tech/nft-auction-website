import styled, { css } from 'styled-components'
import ICON1_IMG from '@/assets/icon1.png'
import { webLayoutAdaptation, h5LayoutAdaptation, webLayoutAdaptationMax } from '@/common/styled'

export const AuctionWrapper = styled.div`
  min-height: calc(100vh - 17.88rem - 8.75rem);
  background: ${(props) => props.theme.bgColor2};
  .auction-return-home {
    ${webLayoutAdaptation}
    ${(props) =>
      props.theme.mediaWidth.screenMd(
        () => css`
          ${h5LayoutAdaptation}
        `,
      )}
    @media(min-width: 1920px) {
      ${webLayoutAdaptationMax}
    }
  }
  .table-hight {
    min-width: 7.06rem;
    height: 2.13rem;
    border-radius: 1.38rem;
    /* position: absolute;
    right: 2.5rem;
    top: calc(50% - 1.065rem); */
    font-size: 1rem;
    text-indent: 0;
    /* z-index: 3; */
    text-align: center;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 600;
    line-height: 2.13rem;
    color: ${(props) => props.theme.themeColor};
    ${(props) =>
      props.theme.mediaWidth.screenMd(
        () => css`
          /* right: 1.5rem; ; */
        `,
      )}
  }
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
  width: 50%;
  font-family: 'PingFang-SC-Regular';
  font-weight: 400;
  color: #545062;
  line-height: 2.5rem;
  display: flex;
  margin-bottom: 0.94rem;
  align-items: center;
  .span {
    margin-left: 1.06rem;
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
  ${webLayoutAdaptation}
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
  .auction-image {
    margin-top: -0.63rem;
  }
  .auction-image,
  .ant-image {
    width: 100%;
    height: 29.44rem;
    object-fit: cover;
    border-radius: 1.88rem 1.88rem 0 0;
  }
  h1 {
    font-size: 3.75rem;
    font-family: 'Avenir-Bold', 'Avenir';
    font-weight: 900;
    color: ${(props) => props.theme.black2};
    line-height: 5.13rem;
    text-align: center;
    margin-top: 2.75rem;
    margin-bottom: 1.25rem;
  }
  .ant-spin-nested-loading {
    width: 100%;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        ${h5LayoutAdaptation}
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
  @media(min-width: 1920px) {
    ${webLayoutAdaptationMax}
  }
`

export const AuctionContent = styled.div`
  width: 100%;
  min-height: 27.06rem;
  background: rgba(152, 148, 163, 0.05);
  padding: 2.81rem 12.94rem 2.56rem;
  h4 {
    font-size: 1.88rem;
    font-family: 'Avenir-Bold', 'Avenir';
    font-weight: 900;
    color: ${(props) => props.theme.black2};
    line-height: 2.56rem;
    margin-bottom: 0.63rem;
  }
  p {
    font-size: 1.25rem;
    font-family: 'PingFang-SC-Regular';
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
    line-height: 1.75rem;
    margin-bottom: 1.31rem;
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
      margin-left: 1.06rem;
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
  padding: 2.63rem 12.94rem 1.5rem;
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
      margin-bottom: 0.63rem;
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
      border-radius: 1.88rem;
      line-height: 3.13rem;
      text-align: center;
      margin-top: 0.63rem;
      font-size: 1.63rem;
      font-family: 'PingFang-SC-Semibold';
      font-weight: 600;
      padding: 0 0.63rem;
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
    margin-top: 2.25rem;
    margin-bottom: 1.25rem;
    opacity: 0.5;
  }
  h2 {
    font-size: 1.75rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 600;
    color: ${(props) => props.theme.black};
    line-height: 2.5rem;
  }
  h2.theme {
    position: relative;
    color: ${(props) => props.theme.themeColor};
    &:after {
      content: '';
      background: url(${ICON1_IMG}) no-repeat;
      background-size: 100% 100%;
      width: 2.31rem;
      height: 1.94rem;
      position: absolute;
      left: calc(-2.31rem - 0.5rem);
      top: 0.2rem;
    }
  }
  p.sss {
    margin-top: 1.25rem;
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
  ${webLayoutAdaptation}
  height: 45.63rem;
  background: #ffffff;
  box-shadow: 0rem 1.94rem 1.88rem 0rem rgba(146, 159, 198, 0.1);
  border-radius: 1.88rem;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        ${h5LayoutAdaptation}
      `,
    )}
  @media(min-width: 1920px) {
    ${webLayoutAdaptationMax}
  }
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
  .span {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  tr {
    width: 100%;
    th {
      width: 18%;
      font-size: 1.5rem;
      font-family: 'Avenir-Bold', 'Avenir';
      font-weight: 900;
      word-break: keep-all;
      text-align: start;
      color: ${(props) => props.theme.black2};
      &:nth-child(1) {
        text-align: center;
      }
      &:nth-child(2) {
        width: 28%;
        text-align: start;
        text-indent: 1em;
      }
      &:nth-child(3) {
        width: 22%;
      }
      &:nth-child(5) {
        width: 14%;
      }
    }
    td {
      width: 18%;
      text-align: center;
      font-size: 1.5rem;
      word-break: keep-all;
      font-family: 'Avenir';
      position: relative;
      font-weight: normal;
      color: ${(props) => props.theme.black2};
      text-align: start;
      &:nth-child(1) {
        font-size: 2.31rem;
        font-family: 'DIN-Alternate-Bold';
        font-weight: bold;
        opacity: 0.5;
        text-align: center;
      }
      &:nth-child(2) {
        width: 100%;
        text-align: start;
        text-indent: 1em;
        display: flex;
        height: 6.19rem;
        align-items: center;
        justify-content: flex-start;
      }
      &:nth-child(3) {
        width: 22%;
      }
      &:nth-child(5) {
        width: 14%;
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
      text-align: start;
      color: ${(props) => props.theme.black2};
      &:nth-child(1) {
        text-align: center;
      }
      &:nth-child(2) {
        min-width: 20.38rem;
      }
      &:nth-child(5) {
        min-width: 10.38rem;
      }
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
      text-align: start;
      color: ${(props) => props.theme.black2};
      &:nth-child(1) {
        font-size: 2.31rem;
        font-family: 'DIN-Alternate-Bold';
        font-weight: bold;
        text-align: center;
        opacity: 0.5;
      }
      &:nth-child(2) {
        min-width: 20.38rem;
        display: flex;
        height: 6.19rem;
        align-items: center;
        justify-content: flex-start;
      }
      &:nth-child(5) {
        min-width: 10.38rem;
      }
    }
  }
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
    /* border: 0.06rem solid #c8c8d9; */
    font-size: 1.81rem;
    font-family: 'PingFang-SC-Regular';
    font-weight: 400;
    color: ${(props) => props.theme.black2};
    line-height: 2.56rem;
    width: 100%;
    border-left: 0;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
  .ant-input-number-group-addon {
    font-size: 1.75rem;
    font-family: 'Avenir-Bold', 'Avenir';
    font-weight: 900;
    color: ${(props) => props.theme.black2};
    line-height: 2.38rem;
    border-radius: 2.75rem 0 0 2.75rem;
    padding: 0 1.25rem 0 2rem;
  }
  p {
    font-size: 1.38rem;
    font-family: 'PingFang-SC-Regular';
    font-weight: 400;
    color: ${(props) => props.theme.black};
    line-height: 1.88rem;
    padding-top: 1.94rem;
    text-align: center;
    opacity: 0.5;
    margin-bottom: 1.06rem;
  }
  .submit-btn {
    width: calc(100% - 3.44rem);
    height: 5rem;
    background: #5927ef;
    border-radius: 2.5rem;
    font-size: 1.5rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 600;
    color: #ffffff;
    margin-left: 1.44rem;
    margin-right: 2rem;
  }
`

export const ModalLable = styled.div`
  font-size: 1.75rem;
  font-family: 'Avenir';
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
  text-align: center;
  line-height: 1.75rem;
  .theme {
    font-family: 'DIN-Alternate-Bold';
    font-weight: bold;
    margin-left: 1.38rem;
    color: #5927ef;
  }
`

export const AuctionVideo = styled.video`
  width: 100%;
  height: 29.44rem;
  object-fit: cover;
  border-radius: 1.88rem 1.88rem 0 0;
`
