import { memo, useEffect, useState, useRef } from 'react'
import { Image, Button, Divider, Modal, Form, InputNumber, message } from 'antd'
import {
  AuctionWrapper,
  AuctionReturn,
  AuctionInfo,
  AuctionContent,
  AuctionData,
  AuctionBtn,
  OffersListDiv,
  OffersTitle,
  OffersTables,
  OffersTable,
  TableHight,
  ModalContent,
  ModalLable,
  ModalTitles,
} from './styled'
import { LeftCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AUCTION_DEFAULT_IMAGE from '@/assets/auction-default.png'
import HEAD_MIN_ICON from '@/assets/head-icon.png'
import { useAuctionHooks } from '@/hooks/useAuctionHooks'
import useDataHooks from '@/hooks/useDataHooks'
import { useHistory } from 'react-router-dom'
import type { ConstantInitTypes } from '@/contracts/constantInit'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import CountDown from '@/components/CountDown'
import moment from 'moment'

export default memo(function AuctionPage(props: any) {
  let history = useHistory()
  const [key, setKey] = useState<string | undefined>(() => {
    let match = props.match
    let str = undefined
    if (match.params && match.params.id) {
      if (match.params.id.toString() !== '0') {
        message.error({
          content: t('auction.message.tips'),
          className: 'message-global',
        })
        setTimeout(() => {
          history.replace('/home')
        }, 2000)
      } else str = match.params.id
    }
    return str
  })
  const { t } = useTranslation()
  const { offersList, times } = useAuctionHooks({ key })

  const dataInit: ConstantInitTypes = useDataHooks()
  const { toWeiFromWei } = dataInit

  const [onShow, setOnShow] = useState<boolean>(false)
  const modalRef = useRef<any>(null)

  const { windowSize } = useWindowSizeHooks()

  useEffect(() => {
    let match = props.match
    if (match.params && match.params.id) {
      let str = match.params.id
      if (str.toString() !== '0') {
        message.error({
          content: t('auction.message.tips'),
          className: 'message-global',
        })
        setTimeout(() => {
          history.replace('/home')
        }, 2000)
      } else setKey(str)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFinish = (values: any) => {}

  return (
    <AuctionWrapper ref={modalRef}>
      <Link to="/home">
        <AuctionReturn>
          <LeftCircleOutlined /> <span>{t('auction.title.go')}</span>
        </AuctionReturn>
      </Link>
      <AuctionInfo>
        <Image className="auction-image" src={AUCTION_DEFAULT_IMAGE} preview={false} />
        <h1>{t('auction.start.title')}</h1>
        <CountDown
          timeStamp={moment().add(times, 'seconds').format('X')}
          returnClick={() => {
            console.log('sss')
          }}
        />
        <AuctionContent>
          <h4>{t('auction.start.h4')}</h4>
          <p>{t('auction.start.p')}</p>
          <div className="buttom">
            <Image src={HEAD_MIN_ICON} preview={false}></Image> <span>{t('auction.start.span1')}</span>
            <span className="themes">{t('auction.start.span2')}</span>
          </div>
        </AuctionContent>
        <AuctionData>
          <div className="list">
            <h5>{t('auction.list.title1')}</h5>
            <div className="span">
              15700.00 <span>{t('auction.list.title2')}</span>
            </div>
          </div>
          <div className="list">
            <div className="edition">{t('auction.list.title3')}&nbsp;1</div>
            <div className="tag">{t('auction.list.title4')}</div>
          </div>
        </AuctionData>
        <Divider plain className="gray"></Divider>
        <AuctionBtn>
          <p>{t('auction.list.btn.p')}</p>
          <Button type="primary" onClick={() => setOnShow(true)}>
            {t('auction.list.btn')}
          </Button>
        </AuctionBtn>
      </AuctionInfo>
      <div style={{ height: 'calc(5.31rem + 3.13rem)' }}></div>
      <OffersListDiv>
        <OffersTitle>{t('auction.offers.list.title')}</OffersTitle>
        {windowSize.innerWidth >= Adapth5 ? (
          <OffersTables>
            <thead>
              <tr>
                <th>{t('auction.offers.list.th1')}</th>
                <th>{t('auction.offers.list.th2')}</th>
                <th>{t('auction.offers.list.th3')}</th>
                <th>{t('auction.offers.list.th4')}</th>
                <th>{t('auction.offers.list.th5')}</th>
              </tr>
            </thead>
            <tbody>
              {offersList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {toWeiFromWei(item.price)}&nbsp;{t('auction.list.title2')}&nbsp;
                    {item.isHight && <TableHight>{t('auction.offers.list.hgiht')}</TableHight>}
                  </td>
                  <td>{item.floorDifference}</td>
                  <td>{item.expiration}</td>
                  <td className="theme">{item.from}</td>
                </tr>
              ))}
            </tbody>
          </OffersTables>
        ) : (
          <div className="table_box_big">
            <div className="table_box">
              <OffersTable>
                <thead>
                  <tr>
                    <th>{t('auction.offers.list.th1')}</th>
                    <th>{t('auction.offers.list.th2')}</th>
                    <th>{t('auction.offers.list.th3')}</th>
                    <th>{t('auction.offers.list.th4')}</th>
                    <th>{t('auction.offers.list.th5')}</th>
                  </tr>
                </thead>
              </OffersTable>
              <div className="table_tbody_box">
                <OffersTable>
                  <tbody>
                    {offersList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {toWeiFromWei(item.price)}&nbsp;{t('auction.list.title2')}&nbsp;
                          {item.isHight && <TableHight>{t('auction.offers.list.hgiht')}</TableHight>}
                        </td>
                        <td>{item.floorDifference}</td>
                        <td>{item.expiration}</td>
                        <td className="theme">{item.from}</td>
                      </tr>
                    ))}
                  </tbody>
                </OffersTable>
              </div>
            </div>
          </div>
        )}
      </OffersListDiv>
      <div style={{ height: '6.25rem' }}></div>
      <Modal
        visible={onShow}
        className="modal-mask"
        footer={null}
        onCancel={() => setOnShow(false)}
        width="40.63rem"
        centered
        getContainer={modalRef.current}
        bodyStyle={{ padding: '4.25rem 0' }}
      >
        <h2>{t('auction.modal.list.title')}</h2>
        <ModalContent>
          <ModalLable>{t('auction.modal.list.lable')}</ModalLable>
          <Form onFinish={onFinish}>
            <Form.Item name="price" rules={[{ required: true, message: t('auction.modal.form.list1.rules') }]}>
              <InputNumber
                precision={2}
                min={0.01}
                addonBefore={t('auction.modal.form.list1.uint')}
                className="form-price"
                placeholder={t('auction.modal.form.list1.placeholder')}
              />
            </Form.Item>
            <ModalTitles>
              <span>{t('auction.modal.form.span1')}</span>
              <span className="theme">15400.00&nbsp;{t('auction.modal.form.list1.uint')}</span>
            </ModalTitles>
            <p>{t('auction.modal.form.p')}</p>
            <Button type="primary" htmlType="submit" className="submit-btn">
              {t('auction.modal.form.btn')}
            </Button>
          </Form>
        </ModalContent>
      </Modal>
    </AuctionWrapper>
  )
})
