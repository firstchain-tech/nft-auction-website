import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { Image, Button, Divider, Modal, Form, InputNumber, message, Tag, Spin } from 'antd'
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
  ModalContent,
  ModalLable,
  ModalTitles,
  AuctionVideo,
} from './styled'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { LeftCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import type { AuctionListType } from '@/common/data.d'
import { useTranslation } from 'react-i18next'
import AUCTION_DEFAULT_IMAGE2 from '@/assets/auction-default2.png'
import HEAD_MIN_ICON from '@/assets/head-icon.png'
import { useAuctionHooks } from '@/hooks/useAuctionHooks'
import useDataHooks from '@/hooks/useDataHooks'
import { useHistory } from 'react-router-dom'
import type { ConstantInitTypes } from '@/contracts/constantInit'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import CountDown from '@/components/CountDown'
import moment from 'moment'
import { StatusTypes } from '@/contracts/init'
import { FormInstance } from 'antd/es/form'
import ConnectWallet from '@/components/ConnectWallet'
import BigNumber from 'bignumber.js'
import { getAuctionListRedux, getAuctionListReduxApi } from '@/Import/reduxDataLocal'
import { isJson, formatMsgTime } from '@/utils'

const CloseBase =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAARFJREFUWEftl00KwjAQhb8iiEdx6anceB43nsqlRxFBkAErpVYzedPiIOkynZ+PN8lr2pH86ZLz0QCjE2oKNgWjCkTz/2oP7oArcAmqsgU2wNlTx6ugwe2BO3AMQBrcAVgBJw+kF7AvvAZuIqRUwwto05AaPMco59YAqpAynDWsBayFDMGpgF7IMFwEsAQ5C1wU8BOkrZuVRE78yyKVPTj217Fa9n4WuDkU7GGHkLameuXbx2UOBcejTgeYesRTpzXNIflmJT+3GQ+AJ6Z441IOSU3jmthJ2FpApaGSIxl1pJGc61VQbjCYm1TDC5j+ym9CpP5pKtrBUgHeES/Vv1i3ARYlKgQ0BZuCUQWi+en34APHLHApT7TexwAAAABJRU5ErkJggg=='

interface LocalHashobjType {
  from: string
  price: string
  expiration: string
  floorDifference: string
  isTrue: boolean
  status: 'success' | 'pending' | 'error'
}

const InitLocalHashobj: LocalHashobjType = {
  from: '',
  price: '',
  expiration: '',
  floorDifference: '',
  isTrue: false,
  status: 'success',
}

export default memo(function AuctionPage(props: any) {
  const { t } = useTranslation()
  let history = useHistory()
  let formRef = useRef<FormInstance>()

  const dispatch = useDispatch()

  const { localList } = useSelector((state: any) => state.infoInfo)
  const myAddress = useSelector((state: any) => state.userInfo.address)
  const [isRefreshData, setIsRefreshData] = useState(false)

  const [currentStartTime, setCurrentStartTime] = useState<boolean>(() => {
    const CURRENT_TIMESTAMP = moment().format('X')
    let match = props.match
    let str: any = {}
    if (match.params && match.params.id) {
      let obj = localList.find((item: any) => item.numberKey === match.params.id)
      if (obj && match.params.id.toString() !== obj.numberKey.toString()) {
      } else str = obj
    }
    let CURRENT_TIMESTAMP_K = str && str.opening ? new BigNumber(str.opening).minus(2) : new BigNumber(0)
    return Number(CURRENT_TIMESTAMP) > Number(CURRENT_TIMESTAMP_K) ? true : false
  })

  const [key, setKey] = useState<AuctionListType>(() => {
    let match = props.match
    let str: any = {}
    if (match.params && match.params.id) {
      let obj = localList.find((item: any) => item.numberKey === match.params.id)
      if (obj && match.params.id.toString() !== obj.numberKey.toString()) {
        message.error({
          content: t('auction.message.tips'),
          className: 'message-global',
        })
        setTimeout(() => {
          history.replace('/home')
        }, 2000)
      } else str = obj
    }
    return str
  })
  const { bottomStatus, timeFinish, offersList, isHightPrice, loading, status, isSuccess, isParticipate, isReceive } = useAuctionHooks({
    key,
    myAddress,
    isRefreshData,
  })

  const dataInit: ConstantInitTypes = useDataHooks()
  const { constant, apiKey, apiUrl, web3, toWeiFromWei, Auction_ADDRESS } = dataInit
  const context = useWeb3React<Web3Provider>()
  const { active } = context

  const [onShow, setOnShow] = useState<boolean>(false)
  const modalRef = useRef<any>(null)
  const [spinLoading, setSpinLoading] = useState(false)
  const [spinLoadingText, setSpinLoadingText] = useState<string>('Loading')
  const [spinLoadingStatus, setSpinLoadingStatus] = useState<1 | 2>(1)

  const { windowSize } = useWindowSizeHooks()

  const [localStorageBidHash, setLocalStorageBidHash] = useState(() => {
    let obj = localStorage.getItem(`${myAddress}_bid_info_${key.numberKey}`) || ''
    return obj
  })
  const [localHashobj, setLocalHashobj] = useState<LocalHashobjType>(InitLocalHashobj)

  const [type, setType] = useState<string>('.png')

  useEffect(() => {
    let match = props.match
    if (match.params && match.params.id) {
      let str = match.params.id
      let obj = localList.find((item: any) => item.numberKey === match.params.id)
      if (obj && str.toString() !== obj.numberKey.toString()) {
        message.error({
          content: t('auction.message.tips'),
          className: 'message-global',
        })
        setTimeout(() => {
          history.replace('/home')
        }, 2000)
      } else setKey(obj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('details', key)
    if (key.url) {
      let s = key.url.substr(key.url.lastIndexOf('.'))
      setType(s)
    }
  }, [key])

  useEffect(() => {
    let obj = localStorage.getItem(`${myAddress}_bid_info_${key.numberKey}`) || ''
    setLocalStorageBidHash(obj)
    setLocalHashobj(InitLocalHashobj)
    if (obj !== '') getLocalHashInfo(obj)
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageBidHash, myAddress, isRefreshData])

  useEffect(() => {
    if (key && key.finish !== timeFinish) {
      // let finishEnd = new BigNumber(timeFinish).times(1000)
      // let endTime = moment(Number(finishEnd)).format('YYYY/MM/DD HH:mm:ss')
      // let obj = {
      //   ...key,
      //   endTime,
      //   finish: timeFinish,
      // }
      // setKey(obj)
      timeFinishChange(key.collectibleHash)
    }
    if (key && key.finish === timeFinish) {
      timeFinishChange(key.collectibleHash)
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFinish])

  const getLocalHashInfo = async (info: string) => {
    if (isJson(info)) {
      let obj = JSON.parse(info)
      if (obj.hash !== '') {
        let receipt = await web3.eth.getTransactionReceipt(obj.hash)
        console.log('receipt', receipt)
        if (receipt.status === false) {
          let timestamps = await (await web3.eth.getBlock(receipt.blockNumber)).timestamp
          let expiration: any = formatMsgTime(timestamps)
          setLocalHashobj({
            from: obj.myAddress,
            price: obj.price,
            expiration,
            floorDifference: '--',
            isTrue: true,
            status: 'error',
          })
        } else {
          if (receipt.status === true) setLocalHashobj(InitLocalHashobj)
          else {
            let timestamps = obj.timestamp
            let expiration: any = formatMsgTime(timestamps)
            setLocalHashobj({
              from: obj.myAddress,
              price: obj.price,
              expiration,
              floorDifference: '--',
              isTrue: true,
              status: 'pending',
            })
          }
        }
      }
    }
  }

  const timeFinishChange = async (collectibleHash: string) => {
    if (apiKey === '' && apiUrl === '') {
      let list = await getAuctionListRedux({ constant, dispatch, toWeiFromWei, web3, Auction_ADDRESS })
      if (list && list instanceof Array) {
        let obj = list.find((item) => item.collectibleHash.toLowerCase() === collectibleHash.toLowerCase())
        setKey(obj)
      }
    }
    if (apiKey !== '' && apiUrl !== '') {
      let list = await getAuctionListReduxApi({ apiKey, apiUrl, dispatch, toWeiFromWei, web3, Auction_ADDRESS })
      if (list && list instanceof Array) {
        let obj = list.find((item) => item.collectibleHash.toLowerCase() === collectibleHash.toLowerCase())
        setKey(obj)
      }
    }
  }

  const changeCountDown = useCallback(() => {
    if (key) {
      const CURRENT_TIMESTAMP = moment().format('X')
      let CURRENT_TIMESTAMP_K = new BigNumber(key.opening).minus(2)
      let isTrues = Number(CURRENT_TIMESTAMP) > Number(CURRENT_TIMESTAMP_K) ? true : false
      setCurrentStartTime(isTrues)
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStartTime, key])

  const onFinish = async (values: any) => {
    let balanceUsdt = await constant.ContractUsdt.methods.balanceOf(myAddress).call()
    let balanceToWei = toWeiFromWei(balanceUsdt)
    console.log('balanceUsdt', balanceUsdt)
    if (Number(values.price) > Number(balanceToWei)) {
      message.warning({
        content: `${t('auction.message.tips31', { msg: 'USDT' })} ${balanceToWei}`,
        className: 'message-global',
      })
      return false
    }
    let price = await web3.utils.toWei(values.price.toString(), 'mwei')
    setSpinLoading(true)
    setSpinLoadingText('Make Offer Loading...')
    setSpinLoadingStatus(2)
    onFinishAuthorize(price)
  }

  const onFinishAuthorize = async (price: any) => {
    try {
      let AuthorizedAmount = await constant.ContractUsdt.methods.allowance(myAddress, Auction_ADDRESS).call()
      if (AuthorizedAmount < (price || '0')) {
        constant.ContractUsdt.methods
          .approve(Auction_ADDRESS, price)
          .send({
            from: myAddress,
          })
          .on('transactionHash', function (hash: any) {
            console.log(hash)
          })
          .on('receipt', async (receipt: any) => {
            onFinishImplement(price)
          })
          .on('error', function (error: any, receipt: any) {
            message.error({
              content: error.message,
              className: 'message-global',
            })
            setSpinLoading(false)
          })
      } else onFinishImplement(price)
    } catch (error) {
      setSpinLoading(false)
      console.log('error', error)
    }
  }

  const onFinishImplement = async (price: any) => {
    try {
      constant.ContractAuction.methods
        .bid(key.collectibleHash, price)
        .send({ from: myAddress })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
          let timestamp = moment().valueOf()
          localStorage.setItem(`${myAddress}_bid_info_${key.numberKey}`, JSON.stringify({ hash, price, myAddress, timestamp }))
        })
        .on('receipt', async (receipt: any) => {
          message.success({
            content: t('auction.message.tips4'),
            className: 'message-global',
          })
          setSpinLoading(false)
          setOnShow(false)
          setIsRefreshData(!isRefreshData)
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          console.log('error', error)
          setSpinLoading(false)
          setOnShow(false)
          setIsRefreshData(!isRefreshData)
        })
    } catch (error) {
      setSpinLoading(false)
      setOnShow(false)
      setIsRefreshData(!isRefreshData)
      console.log('error', error)
    }
  }

  const receiveClick = async () => {
    try {
      if (isReceive) {
        message.info({
          content: t('auction.message.receies.tips'),
          className: 'message-global',
        })
        return false
      }
      setSpinLoading(true)
      setSpinLoadingText('Receive Loading...')
      setSpinLoadingStatus(1)
      constant.ContractAuction.methods
        .withdraw(key.collectibleHash)
        .send({ from: myAddress })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          message.success({
            content: t('auction.message.tips3'),
            className: 'message-global',
          })
          setSpinLoading(false)
          setIsRefreshData(!isRefreshData)
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          console.log('error', error)
          setSpinLoading(false)
        })
    } catch (error) {
      setSpinLoading(false)
      console.log('error', error)
    }
  }

  const markeOfficeClick = async () => {
    let maxArr = offersList.filter((item, index) => index === 0)
    let obj = maxArr.find((item) => item.bidder.toLowerCase() === myAddress.toLowerCase())
    console.log('obj', obj)
    if (obj && obj.bidder) {
      message.info({
        content: t('auction.message.tips5'),
        className: 'message-global',
      })
    } else if (localHashobj.isTrue === true && localHashobj.status === 'pending') {
      message.warning({
        content: t('auction.message.tipsP'),
        className: 'message-global',
      })
    } else {
      setTimeout(() => {
        setOnShow(true)
      }, 100)
    }
  }

  return (
    <>
      {key && (
        <AuctionWrapper ref={modalRef}>
          <div className="auction-return-home">
            <Link to="/home">
              <AuctionReturn>
                <LeftCircleOutlined /> <div className="span">{t('auction.title.go')}</div>
              </AuctionReturn>
            </Link>
          </div>
          <AuctionInfo>
            {(type === '.jpg' || type === '.png' || type === '.gif' || type === '.svg') && (
              <Image className="auction-image" src={key.url || AUCTION_DEFAULT_IMAGE2} preview={false} />
            )}
            {(type === '.mp4' || type === '.webm') && <AuctionVideo src={key.url} controls loop autoPlay
              poster={key.iamge || AUCTION_DEFAULT_IMAGE2}></AuctionVideo>}
            <h1>{!currentStartTime ? t('auction.start.title') : t('auction.end.title')}</h1>
            <CountDown
              timeStamp={moment(!currentStartTime ? key.startTime : key.endTime).format('X')}
              returnClickIsData={() => {
                setIsRefreshData(!isRefreshData)
              }}
              returnClick={changeCountDown}
            />
            <AuctionContent>
              <h4>{t('auction.start.h4')}</h4>
              <p>{t('auction.start.p')}</p>
              <div className="buttom">
                <Image src={HEAD_MIN_ICON} preview={false}></Image> <span>{t('auction.start.span1')}</span>
                <span className="themes">{t('auction.start.span2')}</span>
              </div>
            </AuctionContent>
            <Spin tip="Loading..." spinning={loading}>
              <AuctionData>
                {!loading && (
                  <>
                    <div className="list">
                      <h5>{t('auction.list.title1')}</h5>
                      <div className="span">
                        {isHightPrice ? isHightPrice : key.totalPrice} <span>{t('auction.list.title2')}</span>
                      </div>
                    </div>
                    <div className="list">
                      <div className="edition">
                        {t('auction.list.title3')}&nbsp;{key.amount}
                      </div>
                      <Tag
                        style={{
                          color: StatusTypes[status].color,
                          background: StatusTypes[status].background,
                          borderColor: StatusTypes[status].borderColor,
                        }}
                        className="tag"
                      >
                        {StatusTypes[status].text}
                      </Tag>
                    </div>
                  </>
                )}
              </AuctionData>
              <Divider plain className="gray"></Divider>
              {active && !loading && (
                <Spin spinning={spinLoading && spinLoadingStatus === 1} tip={spinLoadingText}>
                  <>
                    {/* has not started */}
                    {bottomStatus === '1' && (
                      <AuctionBtn>
                        <p>{t('auction.list.btn.p')}</p>
                        <Button type="primary" disabled className="disabled-btn">
                          {t('auction.list.btn')}
                        </Button>
                        <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p1')}</p>
                        <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p2')}</p>
                      </AuctionBtn>
                    )}
                    {/* in progress */}
                    {bottomStatus === '2' && (
                      <AuctionBtn>
                        <p>{t('auction.list.btn.p')}</p>
                        <Button
                          type="primary"
                          onClick={() => {
                            if (status !== '1') {
                              setIsRefreshData(!isRefreshData)
                              setTimeout(() => {
                                markeOfficeClick()
                              }, 400)
                            }
                          }}
                        >
                          {t('auction.list.btn')}
                        </Button>
                        <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p1')}</p>
                        <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p2')}</p>
                      </AuctionBtn>
                    )}
                    {/* end, yes bids */}
                    {bottomStatus === '3' && offersList.length !== 0 && (
                      <AuctionBtn>
                        <br />
                        {myAddress && myAddress.toLowerCase() === key.seller.toLowerCase() ? (
                          <>
                            {isParticipate ? (
                              <>
                                {isSuccess ? (
                                  <>
                                    <h2 className="theme">{t('auction.btn.title')}</h2>
                                    <p className="sss">
                                      {t('auction.btn.p2')}&nbsp;&nbsp;{key.amount}
                                    </p>
                                    {!isReceive ? (
                                      <Button
                                        className={isReceive ? 'disabled-btn' : ''}
                                        disabled={isReceive}
                                        type="primary"
                                        onClick={() => receiveClick()}
                                      >
                                        {t('auction.btn.success1')}
                                      </Button>
                                    ) : (
                                      <Link to="/home#reward">
                                        <Button type="primary">{t('auction.btn.success')}</Button>
                                      </Link>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <h2>{t('auction.btn.btn')}</h2>
                                    <p className="sss">{t('auction.btn.p')}</p>
                                    <Link to="/home#reward">
                                      <Button type="primary">{t('auction.btn.success')}</Button>
                                    </Link>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <h2 className="theme">{t('auction.btn.title')}</h2>
                                <p className="sss">
                                  {t('auction.btn.p1')}&nbsp;&nbsp;{isHightPrice ? isHightPrice : key.totalPrice}&nbsp;
                                  {t('auction.list.title2')}
                                </p>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {isParticipate ? (
                              <>
                                {isSuccess ? (
                                  <>
                                    <h2 className="theme">{t('auction.btn.title')}</h2>
                                    <p className="sss">
                                      {t('auction.btn.p2')}&nbsp;&nbsp;{key.amount}
                                    </p>
                                    {!isReceive ? (
                                      <Button
                                        className={isReceive ? 'disabled-btn' : ''}
                                        disabled={isReceive}
                                        type="primary"
                                        onClick={() => receiveClick()}
                                      >
                                        {t('auction.btn.success1')}
                                      </Button>
                                    ) : (
                                      <Link to="/home#reward">
                                        <Button type="primary">{t('auction.btn.success')}</Button>
                                      </Link>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <h2>{t('auction.btn.btn')}</h2>
                                    <p className="sss">{t('auction.btn.p')}</p>
                                    <Link to="/home#reward">
                                      <Button type="primary">{t('auction.btn.success')}</Button>
                                    </Link>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {' '}
                                <h2>{t('auction.btn.btn')}</h2>
                                <p className="sss">{t('auction.btn.p')}</p>
                              </>
                            )}
                          </>
                        )}
                        <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p1')}</p>
                        <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p2')}</p>
                      </AuctionBtn>
                    )}
                    {/* end, no bids */}
                    {bottomStatus === '3' && offersList.length === 0 && (
                      <AuctionBtn>
                        <h2>{t('auction.btn.btn')}</h2>
                        <p className="sss">{t('auction.btn.p')}</p>
                        <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p1')}</p>
                        <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p2')}</p>
                      </AuctionBtn>
                    )}
                  </>
                </Spin>
              )}
              {!active && !loading && (
                <AuctionBtn>
                  <ConnectWallet />
                  <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p1')}</p>
                  <p style={{ marginBottom: 0 }}>{t('auction.list.btn.p2')}</p>
                </AuctionBtn>
              )}
            </Spin>
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
                  {!loading && localHashobj.isTrue && localHashobj.from === myAddress && (
                    <tr style={{ opacity: localHashobj.status === 'pending' ? 0.5 : 1 }}>
                      <td>0</td>
                      <td>
                        {toWeiFromWei(localHashobj.price)}&nbsp;{t('auction.list.title2')}&nbsp;
                      </td>
                      <td>{localHashobj.floorDifference}</td>
                      <td>{localHashobj.expiration}</td>
                      <td className="theme">{localHashobj.from.substring(localHashobj.from.length - 6)}</td>
                    </tr>
                  )}
                  {!loading &&
                    offersList.length > 0 &&
                    offersList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="span" style={{ width: item.isHight ? '50%' : '100%' }}>
                            {toWeiFromWei(item.price)}&nbsp;{t('auction.list.title2')}&nbsp;
                          </div>
                          {item.isHight && (
                            <Tag style={{ textIndent: 0 }} className="table-hight" color="rgba(96, 35, 249, 0.1)">
                              {t('auction.offers.list.hgiht')}
                            </Tag>
                          )}
                        </td>
                        <td>{item.floorDifference}</td>
                        <td>{item.expiration}</td>
                        <td className="theme">{item.bidder.substring(item.bidder.length - 6)}</td>
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
                        {localHashobj.isTrue && localHashobj.from === myAddress && (
                          <tr>
                            <td>0</td>
                            <td>
                              {toWeiFromWei(localHashobj.price)}&nbsp;{t('auction.list.title2')}&nbsp;
                            </td>
                            <td>{localHashobj.floorDifference}</td>
                            <td>{localHashobj.expiration}</td>
                            <td>{localHashobj.from.substring(localHashobj.from.length - 6)}</td>
                          </tr>
                        )}
                        {offersList.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="span" style={{ width: item.isHight ? '50%' : '100%' }}>
                                {toWeiFromWei(item.price)}&nbsp;{t('auction.list.title2')}&nbsp;
                              </div>
                              {item.isHight && (
                                <Tag style={{ textIndent: 0 }} className="table-hight" color="rgba(96, 35, 249, 0.1)">
                                  {t('auction.offers.list.hgiht')}
                                </Tag>
                              )}
                            </td>
                            <td>{item.floorDifference}</td>
                            <td>{item.expiration}</td>
                            <td className="theme">{item.bidder.substring(item.bidder.length - 6)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </OffersTable>
                  </div>
                </div>
              </div>
            )}
            {loading && (
              <div className="loadings auction-loading">
                <Spin tip="Loading..." />
              </div>
            )}
            {/* {!loading && offersList.length === 0 && <div>-</div>} */}
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
            bodyStyle={{ padding: '4.25rem 0 3.75rem 0' }}
            afterClose={() => {
              formRef.current!.resetFields()
            }}
            closeIcon={<Image src={CloseBase} className="modal-close-icons" preview={false} />}
          >
            <Spin spinning={spinLoading && spinLoadingStatus === 2} tip={spinLoadingText}>
              <h2>{t('auction.modal.list.title')}</h2>
              <ModalContent>
                <ModalLable>{t('auction.modal.list.lable')}</ModalLable>
                <Form onFinish={onFinish} ref={formRef as any}>
                  <Form.Item name="price" rules={[{ required: true, message: t('auction.modal.form.list1.rules') }]}>
                    <InputNumber
                      disabled={loading}
                      precision={2}
                      min={isHightPrice ? Number(new BigNumber(isHightPrice).plus(0.01)) : Number(new BigNumber(key.totalPrice).plus(0.01))}
                      addonBefore={t('auction.modal.form.list1.uint')}
                      className="form-price"
                      placeholder={t('auction.modal.form.list1.placeholder')}
                    />
                  </Form.Item>
                  <Spin tip="Loading..." spinning={loading}>
                    <ModalTitles>
                      <span>{t('auction.modal.form.span1')}</span>
                      <span className="theme">
                        {isHightPrice ? isHightPrice : key.totalPrice}&nbsp;{t('auction.modal.form.list1.uint')}
                      </span>
                    </ModalTitles>
                  </Spin>
                  {localHashobj.status === 'error' && localHashobj.isTrue === true && localHashobj.from === myAddress && (
                    <p style={{ color: '#F30000', opacity: 1 }}>
                      {t('auction.modal.error.tips', { price: toWeiFromWei(localHashobj.price) })}
                    </p>
                  )}
                  <p
                    style={{
                      paddingTop:
                        localHashobj.status === 'error' && localHashobj.isTrue === true && localHashobj.from === myAddress
                          ? '0'
                          : '1.94rem',
                    }}
                  >
                    {t('auction.modal.form.p')}
                  </p>
                  <Button type="primary" htmlType="submit" className={loading ? 'submit-disabled-btn' : 'submit-btn'} disabled={loading}>
                    {t('auction.modal.form.btn')}
                  </Button>
                </Form>
              </ModalContent>
            </Spin>
          </Modal>
        </AuctionWrapper>
      )}
    </>
  )
})
