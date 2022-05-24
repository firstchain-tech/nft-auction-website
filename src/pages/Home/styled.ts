import styled, { css } from 'styled-components'
import { Row } from 'antd'
import BANNER from '@/assets/banner.jpg'
import M_BANNER from '@/assets/m-banner.jpg'
import BANNER_DATA_IMG from '@/assets/banner-data.png'
import { webLayoutAdaptation, h5LayoutAdaptation, webLayoutAdaptationMax } from '@/common/styled'

export const HomeWrapper = styled.div`
  .home-wrappers {
    margin-bottom: -3.5rem;
    position: relative;
    top: -3.5rem;
    color: transparent;
    height: calc(12.25rem - 8.75rem);
  }
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
      border-radius: 2.81rem;
      font-size: 1.63rem;
      font-family: 'PingFang-SC-Semibold';
      font-weight: 600;
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

export const HomeMaxBgColor1 = styled.div`
  background: ${(props) => props.theme.bgColor1};
`
export const HomeMaxBgColor2 = styled.div`
  background: ${(props) => props.theme.bgColor2};
`

export const Banner = styled.div`
  width: 100%;
  min-height: 72.5rem;
  position: absolute;
  z-index: 0;
  @media (min-width: 1921px) {
    background: url(${BANNER}) no-repeat;
    background-size: min(120rem, 100%) auto;
    background-position: center;
    top: 0;
  }
  @media (max-width: 1920px) {
    background: url(${BANNER}) no-repeat;
    background-size: 100% auto;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        background: url(${M_BANNER}) no-repeat;
        background-size: 100% auto;
        /* background-repeat: no-repeat;
        background-position: right 31% top 0%;
        background-size: auto 46.5rem; */
      `,
    )}
`

export const HomeBanner = styled.div`
  position: relative;
  height: auto;
  z-index: 1;
  ${webLayoutAdaptation}
  h3 {
    font-size: 2.31rem;
    font-family: 'Avenir-bold';
    font-weight: 600;
    color: ${(props) => props.theme.white};
    margin-top: 7.25rem;
    line-height: 4rem;
    margin-bottom: 1.88rem;
  }
  h5 {
    margin-top: 0;
    font-size: 1.5rem;
    font-family: 'Avenir';
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    line-height: 2.25rem;
    margin-bottom: 0;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        ${h5LayoutAdaptation}
        h3 {
          font-size: 2.31rem;
          line-height: 3.19rem;
          margin-top: 7.13rem;
        }
      `,
    )}
  @media(min-width: 1920px) {
    ${webLayoutAdaptationMax}
  }
`

export const BannerData = styled.div`
  margin-top: 5.75rem;
  height: 7.69rem;
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
    /* width: calc(33% - 3.13rem); */
    span {
      font-size: 0.94rem;
      font-family: 'Avenir';
      font-weight: 900;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      color: rgba(255, 255, 255, 0.5);
      line-height: 1.88rem;
    }
    h4 {
      font-size: 1.88rem;
      font-family: 'Avenir';
      font-weight: 900;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      color: ${(props) => props.theme.white};
      line-height: 1.88rem;
      margin-top: 0.5rem;
    }
    &:nth-child(1) {
      margin-left: 2.31rem;
    }
    &:nth-child(1) {
      margin-left: 3.81rem;
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

export const HomeAbout = styled.div`
  ${webLayoutAdaptation}
  position: relative;
  top: -11.5rem;
  margin-bottom: 18.13rem;
  .about-content {
    display: flex;
    .home-aboutsss {
      width: 20.13rem;
      height: 31.25rem;
    }
    .content-right {
      margin-left: 3.19rem;
    }
  }
  h4 {
    font-size: 1.75rem;
    font-family: 'Avenir';
    font-weight: 900;
    color: ${(props) => props.theme.white};
    /* line-height: 4rem; */
    margin-top: -0.94rem;
    margin-bottom: 0.63rem;
  }
  p {
    font-size: 1.5rem;
    font-family: 'Avenir';
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    line-height: 2.13rem;
    margin-bottom: 0.63rem;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        ${h5LayoutAdaptation}
        position: relative;
        top: -11.5rem;
        margin-bottom: 18.13rem;
      `,
    )}
  @media(min-width: 1920px) {
    ${webLayoutAdaptationMax}
    position: relative;
    top: -11.5rem;
    margin-bottom: 18.13rem;
  }
`

export const HomeAboutTitle = styled.div`
  font-size: 2.13rem;
  font-family: 'Avenir-bold';
  font-weight: 600;
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
          height: 4.13rem;
          width: auto;
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

  .h22 {
    height: 8.75rem;
    position: relative;
    z-index: 0;
    top: -8.75rem;
    margin-bottom: -8.75rem;
  }
`

export const HomeAuction = styled.div`
  ${webLayoutAdaptation}
  position: relative;
  z-index: 2;
  .h22 {
    height: 8.75rem;
    margin-bottom: 0;
    position: relative;
    z-index: 0;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        ${h5LayoutAdaptation}
        position: relative;
        z-index: 2;
      `,
    )}
  @media(min-width: 1920px) {
    ${webLayoutAdaptationMax}
    position: relative;
    z-index: 2;
  }
`

export const AuctionTitle = styled.div`
  font-size: 4.38rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 900;
  color: #ffffff;
  line-height: 6rem;
  top: -8.75rem;
  position: relative;
  text-align: center;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 3.13rem;
      `,
    )}
`

export const HomeReward = styled.div`
  ${webLayoutAdaptation}
  background: ${(props) => props.theme.bgColor2};
  position: relative;
  padding-bottom: 0.1rem;
  .h22 {
    height: 8.75rem;
    margin-bottom: 0;
    position: relative;
    z-index: 0;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        ${h5LayoutAdaptation}
        position: relative;
        padding-bottom: 0.1rem;
      `,
    )}
  @media(min-width: 1920px) {
    ${webLayoutAdaptationMax}
    position: relative;
    padding-bottom: 0.1rem;
  }
`

export const RewardTitle = styled.div`
  font-size: 4.38rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 900;
  color: ${(props) => props.theme.black2};
  line-height: 6rem;
  z-index: 2;
  position: relative;
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
  position: relative;
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

export const HomeAboutH5 = styled.div`
  .home-h5-about-img {
    float: left;
    margin-right: 2.25rem;
    .home-aboutsss {
      max-width: 14.06rem;
      max-height: 21.88rem;
    }
  }
`

export const HomeListTop = styled.div`
  position: relative;
  top: calc(-10.63rem - 8.75rem);
  margin-bottom: -10.63rem;
`

export const HomePartners = styled.div`
  ${webLayoutAdaptation}
  position: relative;
  z-index: 2;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        ${h5LayoutAdaptation}
        position: relative;
        z-index: 2;
      `,
    )}
  @media(min-width: 1920px) {
    ${webLayoutAdaptationMax}
    position: relative;
    z-index: 2;
  }
`

export const PartnersTitle = styled.div`
  font-size: 4.38rem;
  font-family: 'Avenir-Bold', 'Avenir';
  font-weight: 900;
  color: ${(props) => props.theme.black2};
  line-height: 6rem;
  z-index: 2;
  position: relative;
  text-align: center;
  margin-top: 7rem;
  margin-bottom: 2.81rem;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        font-size: 3.13rem;
      `,
    )}
`

export const PartnersContent = styled.div`
  background: #ffffff;
  box-shadow: 0rem 1.94rem 1.88rem 0rem rgb(146 159 198 / 10%);
  border-radius: 1.88rem;
  padding: 3.75rem 6rem;
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        padding: 3.75rem 1.5rem;
      `,
    )}
`