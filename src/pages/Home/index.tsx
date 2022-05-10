import React, { memo, useEffect } from 'react'
import { Row, Col, Image, Form, Input, Button } from 'antd'
import {
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
import { SpanTitle } from '@/components/RewardModal/styled'

const ABOUT_ICON_INIT = [ABOUT_ICON1, ABOUT_ICON2, ABOUT_ICON3, ABOUT_ICON4, ABOUT_ICON5, ABOUT_ICON6, ABOUT_ICON7, ABOUT_ICON8]

export default memo(function HomePages(pages: any) {
  const { t } = useTranslation()
  const { windowSize } = useWindowSizeHooks()
  const [form] = useForm()

  const { auctionList, rewardList, isAuction, isAuctionSuccess } = useHomeHooks()

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let hash = pages.location.hash
    if (hash.length > 0) {
      let str = hash.substr(1)
      scrollToAnchor(str)
    } else {
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages])

  const onFinish = (values: any) => {}

  return (
    <HomeWrapper>
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
        <Row>
          <Col span={8} md={{ span: 6 }}>
            <Image src={ABOUT_FIGURE} width="100%" height="auto" preview={false} />
          </Col>
          <Col span={15} offset={1} md={{ span: 17, offset: 1 }}>
            <h4>{t('home.about.list1.title')}</h4>
            <p>{t('home.about.list1.conent1')}</p>
            {windowSize.innerWidth >= Adapth5 && (
              <>
                <p>{t('home.about.list1.conent2')}</p>
                <p>{t('home.about.list1.conent3')}</p>
              </>
            )}
          </Col>
          {windowSize.innerWidth < Adapth5 && (
            <Col span={24}>
              <p style={{ marginTop: '1em' }}>{t('home.about.list1.conent2')}</p>
              <p>{t('home.about.list1.conent3')}</p>
            </Col>
          )}
        </Row>
        <HomeAboutIcon>
          {ABOUT_ICON_INIT.map((item, index) => (
            <Col span={6} key={index}>
              <Image src={item} preview={false}></Image>
            </Col>
          ))}
        </HomeAboutIcon>
        <HomeAboutList>
          <Col span={24}>
            <h4>{t('home.about.list2.title')}</h4>
            <p>{t('home.about.list2.conent1')}</p>
          </Col>
          <Col span={24}>
            <h4>{t('home.about.list2.title')}</h4>
            <p>{t('home.about.list2.conent1')}</p>
          </Col>
        </HomeAboutList>
      </HomeAbout>
      <HomeAuction>
        <AuctionTitle>{t('home.auction.title')}</AuctionTitle>
        {auctionList.map((item, index) => (
          <AuctionModal key={index} details={item} />
        ))}
      </HomeAuction>
      <HomeReward>
        <h2 className="h22" id="reward">
          {''}
        </h2>
        <RewardTitle>{t('home.reward.title')}</RewardTitle>
        {rewardList.map((item, index) => (
          <RewardModal key={index} details={item} index={index} isAuction={isAuction} />
        ))}
        <CollectRewardsDiv style={{ display: isAuctionSuccess ? 'block' : 'none' }}>
          <h2>{t('home.collect.form.h2')}</h2>
          <Form {...layout} form={form} name="collect" onFinish={onFinish}>
            <Form.Item
              name="email"
              label={<SpanTitle>{t('home.collect.form1.label')}</SpanTitle>}
              rules={[{ required: true, message: t('home.collect.form1.rules') }]}
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
      </HomeReward>
    </HomeWrapper>
  )
})
