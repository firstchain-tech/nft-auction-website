/* eslint-disable */
import React, { memo, useEffect, useState } from 'react'
import { Row, Col, Image, Form, Input, Button, Spin, message } from 'antd'
import {
  Banner,
  HomeWrapper,
  HomeBanner,
  BannerData,
  HomeAbout,
  HomeAboutTitle,
  HomeAboutIcon,
  HomeAboutList,
  HomeAuction,
  AuctionTitle,
  HomeReward,
  RewardTitle,
  CollectRewardsDiv,
  HomePartners,
  PartnersContent,
  PartnersTitle,
  HomeMaxBgColor1,
  HomeMaxBgColor2,
  HomeAboutH5,
  HomeListTop,
} from './styled'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import ABOUT_FIGURE from '@/assets/about-figure.png'
import ABOUT_ICON1 from '@/assets/about-icon1.png'
import ABOUT_ICON2 from '@/assets/about-icon2.png'
import ABOUT_ICON3 from '@/assets/about-icon3.png'
import ABOUT_ICON4 from '@/assets/about-icon4.png'
import ABOUT_ICON5 from '@/assets/about-icon5.png'
import ABOUT_ICON6 from '@/assets/about-icon6.png'
import ABOUT_ICON7 from '@/assets/about-icon7.png'
import ABOUT_ICON8 from '@/assets/about-icon8.png'
import { useHomeHooks } from '@/hooks/useHomeHooks'
import AuctionModal from '@/components/AuctionModal'
import RewardModal from '@/components/RewardModal'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5, scrollToAnchor } from '@/utils'
import { useSelector } from 'react-redux'
import { SpanTitle } from '@/components/RewardModal/styled'
import useDataHooks from '@/hooks/useDataHooks'
import type { ConstantInitTypes } from '@/contracts/constantInit'
import { getWinnerAwardRequest } from '@/api'
import { ResponseCode } from '@/contracts/init'
import { roadmapList } from '@/common/init'
import RoadmapModal from '@/components/RoadmapModal'
import HOME_PARTNERS_ICON from '@/assets/home-partners-icon.png'

const ABOUT_ICON_INIT = [ABOUT_ICON1, ABOUT_ICON2, ABOUT_ICON3, ABOUT_ICON4, ABOUT_ICON5, ABOUT_ICON6, ABOUT_ICON7, ABOUT_ICON8]

export default memo(function HomePages(pages: any) {
  const { t } = useTranslation()
  const { windowSize } = useWindowSizeHooks()
  const [form] = useForm()

  const dataInit: ConstantInitTypes = useDataHooks()
  const { web3 } = dataInit

  const myAddress = useSelector((state: any) => state.userInfo.address)
  const [spinLoading, setSpinLoading] = useState<boolean>(false)
  const { auctionList, rewardList, isAuction, isAuctionSuccess, loading } = useHomeHooks({ myAddress })

  const layout = {
    labelCol: { span: 8, sm: { span: 5 } },
    wrapperCol: { span: 16, sm: { span: 19 } },
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let hash = pages.location.hash
    console.log('hash', hash)
    if (hash.length > 0) {
      let str = hash.substr(1)
      scrollToAnchor(str)
    } else {
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages])

  const onFinish = async (values: any) => {
    setSpinLoading(true)
    try {
      let params = {
        ...values,
        address: myAddress,
      }
      console.log('params', params)
      const response: any = await getWinnerAwardRequest(params)
      console.log('response', response)
      if (response) {
        let text = ResponseCode[response.code]
        if (response.code === 0) {
          message.success({
            content: text,
            className: 'message-global',
          })
          form.resetFields()
          setTimeout(() => {
            setSpinLoading(false)
          }, 1000)
          return
        }
        message.error({
          content: text,
          className: 'message-global',
        })
        setTimeout(() => {
          setSpinLoading(false)
        }, 1000)
      }
      setTimeout(() => {
        setSpinLoading(false)
      }, 1000)
    } catch (error) {
      console.log('error', error)
      setSpinLoading(false)
    }
  }

  return (
    <HomeWrapper>
      <HomeMaxBgColor1>
        <Banner></Banner>
        <HomeBanner>
          <Row>
            <Col span={16} md={{ span: 18 }}>
              <h3>{t('home.banner.h3')}</h3>
            </Col>
            <Col span={14}>
              <h5>{t('home.banner.h5')}</h5>
            </Col>
            <Col span={24} md={{ span: 16 }}>
              <BannerData>
                <div className="list">
                  <span>{t('home.banner.list1.span')}</span>
                  <h4>{t('home.banner.list1.h4')}</h4>
                </div>
                <div className="list">
                  <span>{t('home.banner.list2.span')}</span>
                  <h4>{t('home.banner.list2.h4')}</h4>
                </div>
                <div className="list">
                  <span>{t('home.banner.list3.span')}</span>
                  <h4>{t('home.banner.list3.h4')}</h4>
                </div>
              </BannerData>
            </Col>
          </Row>
        </HomeBanner>
        <HomeAbout>
          <HomeAboutTitle>{t('home.about.title')}</HomeAboutTitle>
          {windowSize.innerWidth >= Adapth5 && (
            <div className="about-content">
              <div>
                <Image className="home-aboutsss" src={ABOUT_FIGURE} width="100%" height="auto" preview={false} />
              </div>
              <div className="content-right">
                <h4>{t('home.about.list1.title')}</h4>
                <p>{t('home.about.list1.conent1')}</p>
                <p>{t('home.about.list1.conent2')}</p>
                <p>{t('home.about.list1.conent3')}</p>
              </div>
            </div>
          )}
          {windowSize.innerWidth < Adapth5 && (
            <HomeAboutH5>
              <div className="home-h5-about-img">
                <Image className="home-aboutsss" src={ABOUT_FIGURE} width="100%" height="auto" preview={false} />
              </div>
              <h4>{t('home.about.list1.title')}</h4>
              <p>{t('home.about.list1.conent1')}</p>
              <p style={{ marginTop: '1em' }}>{t('home.about.list1.conent2')}</p>
              <p>{t('home.about.list1.conent3')}</p>
            </HomeAboutH5>
          )}
          <HomeAboutIcon>
            {ABOUT_ICON_INIT.map((item, index) => (
              <Col span={6} key={index}>
                <Image src={item} preview={false}></Image>
              </Col>
            ))}
          </HomeAboutIcon>
          <HomeAboutList>
            <Col span={24}>
              <h4 style={{ marginTop: 'calc(6.88rem - 3.25rem)' }}>{t('home.about.list2.title')}</h4>
              <p>{t('home.about.list2.conent1')}</p>
            </Col>
            <Col span={24}>
              <h2 className="h22" id="reward">
                {''}
              </h2>
              <h4>{t('home.about.list3.title')}</h4>
              <p style={{ marginTop: '3.81rem' }}>{t('home.about.list3.p3')}</p>
              <p>{t('home.about.list3.p4')}</p>
              <a href="https://opensea.io/assets/matic/0x4b51fedcdd325fce33abccd45e8b96a684a7044d/1" target="_blank">
                <p>https://opensea.io/assets/matic/0x4b51fedcdd325fce33abccd45e8b96a684a7044d/1</p>
              </a>
              {roadmapList.map((item, i) => (
                <RoadmapModal details={item} key={i} num={i} />
              ))}
              <p style={{ marginTop: '3.69rem' }}>{t('home.about.list3.p1')}</p>
              <p>{t('home.about.list3.p2')}</p>
            </Col>
          </HomeAboutList>
        </HomeAbout>
      </HomeMaxBgColor1>
      <HomeMaxBgColor2>
        <HomeListTop>
          <HomeAuction>
            <AuctionTitle>
              <h2 className="h22" id="auction">
                {' '}
                {''}
              </h2>
              {t('home.auction.title')}
            </AuctionTitle>
            {!loading &&
              auctionList.length > 0 &&
              auctionList.map((item, index) => <AuctionModal key={index} details={item} keyTop={index === auctionList.length - 1} />)}
            {loading && (
              <div className="loadings home-auction-loading">
                <Spin tip="Loading..." />
              </div>
            )}
            {!loading && auctionList.length === 0 && <div className="home-auction-loading"></div>}
          </HomeAuction>
          <HomePartners>
            <PartnersTitle>Partners</PartnersTitle>
            <PartnersContent>
              <Image src={HOME_PARTNERS_ICON} preview={false} width="100%" height="auto" />
            </PartnersContent>
          </HomePartners>
          {/* <HomeReward>
            <h2 className="h22" id="reward">
              {''}
            </h2>
            <RewardTitle>{t('home.reward.title')}</RewardTitle>
            {rewardList.map((item, index) => (
              <RewardModal key={index} details={item} index={index} isAuction={isAuction} />
            ))}
            {myAddress && (
              <Spin tip="Loading..." spinning={spinLoading}>
                <CollectRewardsDiv style={{ display: isAuctionSuccess ? 'block' : 'none' }}>
                  <h2>{t('home.collect.form.h2')}</h2>
                  <Form {...layout} form={form} name="collect" onFinish={onFinish}>
                    <Form.Item
                      name="hold_address"
                      label={<SpanTitle>{t('home.collect.form1.label')}</SpanTitle>}
                      rules={[
                        { required: true, message: t('home.collect.form1.rules') },
                        {
                          validator: async (_, value) => {
                            if (value !== '') {
                              let isAddress = await web3.utils.isAddress(value)
                              if (!isAddress) throw new Error(t('home.collect.form1.rules2'))
                            }
                          },
                        },
                      ]}
                    >
                      <Input placeholder={t('home.collect.form1.placeholder')} style={{ padding: '0 2.5rem' }} className="form-email" />
                    </Form.Item>
                    <div className="reward-form-btn">
                      <Button type="primary" htmlType="submit" className="reward-btn">
                        {t('home.collect.btn')}
                      </Button>
                    </div>
                  </Form>
                </CollectRewardsDiv>
              </Spin>
            )}
          </HomeReward> */}
          <div className="home-wrappers">.</div>
        </HomeListTop>
      </HomeMaxBgColor2>
    </HomeWrapper>
  )
})
/* eslint-enable */
