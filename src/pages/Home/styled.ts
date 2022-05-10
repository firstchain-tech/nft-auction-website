import styled, { css } from 'styled-components'
import { Row } from 'antd'
import { ComLayout } from '@/common/styled'
import BANNER from '@/assets/banner.jpg'
import M_BANNER from '@/assets/m-banner.jpg'
import BANNER_DATA_IMG from '@/assets/banner-data.png'

export const HomeWrapper = styled.div`
  #collect {
    .ant-form-item-explain-error {
      font-weight: bold;
    }
    .ant-form-item {
      margin-bottom: 2.13rem !important;
    }
    width: calc(100% - 12rem);
    margin: 0 6rem;
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
    .reward-btn {
      min-width: 31.25rem;
      height: 5.63rem;
      background: #5927ef;
      border-radius: 2.81rem;
      font-size: 1.63rem;
      font-family: 'PingFang-SC-Semibold';
      font-weight: 600;
      color: ${(props) => props.theme.white};
      margin-top: 3.75rem;
      margin-bottom: 5.63rem;
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
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        #collect {
          width: calc(100% - 3rem);
          margin: 0 1.5rem;
        }
      `,
    )}
`

export const HomeBanner = styled(ComLayout)`
  position: relative;
  width: 100%;
  height: auto;
  background: url(${BANNER}) no-repeat;
  background-size: 100% auto;
  h3 {
    font-size: 2.31rem;
    font-family: 'Avenir-Bold';
    font-weight: 900;
    color: ${(props) => props.theme.white};
    margin-top: 8.13rem;
    line-height: 4rem;
  }
  h5 {
    margin-top: 1.88rem;
    font-size: 1.5rem;
    font-family: 'Avenir';
    font-weight: 500;
    color: ${(props) => props.theme.white}32;
    line-height: 2.25rem;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        min-height: 46.5rem;
        background: url(${M_BANNER}) no-repeat;
        background-size: 100% 46.5rem;
        background-position: right 0% top -1%;
        /* background-repeat: no-repeat;
        background-position: right 31% top 0%;
        background-size: auto 46.5rem; */
        h3 {
          font-size: 2.31rem;
          line-height: 3.19rem;
          margin-top: 7.13rem;
        }
      `,
    )}
`

export const BannerData = styled.div`
  margin-top: 5.75rem;
  height: 7.69rem;
  opacity: 0.62;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15.81rem;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    content: '';
    width: 100%;
    height: 7.69rem;
    background: url(${BANNER_DATA_IMG}) no-repeat;
    background-size: 100% 100%;
  }
  .list {
    position: relative;
    z-index: 1;
    margin-left: 3.13rem;
    width: calc(33% - 3.13rem);
    span {
      font-size: 0.94rem;
      font-family: 'Avenir';
      font-weight: 900;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      color: ${(props) => props.theme.white}32;
      line-height: 1.56rem;
    }
    h4 {
      font-size: 1.56rem;
      font-family: 'Avenir';
      font-weight: 900;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      color: ${(props) => props.theme.white};
      line-height: 1.56rem;
      margin-top: 0.5rem;
    }
    &:nth-child(1) {
      margin-left: 2.31rem;
    }
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        margin-top: 4.63rem;
        .list {
          margin-left: 1.5rem;
          width: calc(33% - 1.5rem);
        }
      `,
    )}
`

export const HomeAbout = styled(ComLayout)`
  position: relative;
  top: -11.5rem;
  margin-bottom: 18.13rem;
  h4 {
    font-size: 1.75rem;
    font-family: 'Avenir';
    font-weight: 900;
    color: ${(props) => props.theme.white};
    line-height: 4rem;
    margin-bottom: 1.56rem;
  }
  p {
    font-size: 1.5rem;
    font-family: 'Avenir';
    font-weight: 500;
    color: ${(props) => props.theme.white}28;
    line-height: 2.13rem;
  }
`

export const HomeAboutTitle = styled.div`
  font-size: 2.13rem;
  font-family: 'Avenir';
  font-weight: 900;
  color: #ffffff;
  line-height: 4rem;
  margin-bottom: 3.44rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const HomeAboutIcon = styled(Row)`
  margin-top: 5.94rem;
  .ant-col {
    margin-bottom: 3.25rem;
    display: flex;
    justify-content: center;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        .ant-image,
        .ant-image-img {
          height: 5.13rem;
        }
        .ant-col {
          display: flex;
          justify-content: start;
        }
      `,
    )}
`

export const HomeAboutList = styled(Row)`
  h4 {
    text-align: center;
    margin-top: 6.88rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const HomeAuction = styled(ComLayout)`
  width: 100%;
  min-height: 57.5rem;
  background: ${(props) => props.theme.bgColor2};
`

export const AuctionTitle = styled.div`
  font-size: 4.38rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 900;
  color: #ffffff;
  line-height: 6rem;
  top: -18.13rem;
  position: relative;
  text-align: center;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 3.13rem;
      `,
    )}
`

export const HomeReward = styled(ComLayout)`
  background: ${(props) => props.theme.bgColor2};
  top: -10.63rem;
  position: relative;
  padding-bottom: 0.1rem;
  .h22 {
    height: 8.75rem;
  }
`

export const RewardTitle = styled.div`
  font-size: 4.38rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 900;
  color: ${(props) => props.theme.black2};
  line-height: 6rem;
  text-align: center;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 3.13rem;
      `,
    )}
`

export const CollectRewardsDiv = styled.div`
  width: 100%;
  min-height: 30.44rem;
  background: ${(props) => props.theme.white};
  box-shadow: 0rem 1.94rem 1.88rem 0rem rgba(146, 159, 198, 0.1);
  border-radius: 1.88rem;
  margin-bottom: calc(12.25rem - 5.63rem);
  position: relative;
  top: -5.63rem;
  h2 {
    font-size: 1.75rem;
    font-family: 'PingFang-SC-Semibold';
    font-weight: 600;
    color: #000000;
    padding: 3.13rem 0;
    text-align: center;
    line-height: 2.5rem;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        top: -2.63rem;
      `,
    )}
`
