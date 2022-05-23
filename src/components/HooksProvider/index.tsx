import { useChainIdHooks } from '@/hooks/useChainIdHooks'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import type { ConstantInitTypes } from '@/contracts/constantInit'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAuctionListRedux, getAuctionListReduxApi } from '@/Import/reduxDataLocal'
import { LayoutWrapper } from '@/layout/styled'
import { NoDataAuctionWrapper } from '@/common/styled'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

const HooksProviderPage = ({ children }: any) => {
  useChainIdHooks()

  const { windowSize } = useWindowSizeHooks()
  const [isStyleSuccess, setIsStyleSuccess] = useState(false)
  const [isH5Web, setIsH5Web] = useState<'h5' | 'web'>('web')

  let history = useHistory()

  const dispatch = useDispatch()
  const dataInit: ConstantInitTypes = useDataHooks()
  const { constant, apiKey, apiUrl, web3, toWeiFromWei, Auction_ADDRESS } = dataInit
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (windowSize.innerWidth < 992) setIsH5Web('h5')
    if (windowSize.innerWidth >= 992) setIsH5Web('web')
    if (isStyleSuccess) return
    if (windowSize.innerWidth < 1920 && windowSize.innerWidth > 750) {
      let fontSize =
        windowSize.innerWidth >= 1920
          ? '100%'
          : `${(windowSize.innerWidth / 1920) * 100 > 63 ? (windowSize.innerWidth / 1920) * 100 : 62.5}%`
      document.documentElement.style.fontSize = fontSize
      setIsStyleSuccess(true)
    } else if (windowSize.innerWidth < 750) {
      let fontSize = `${(windowSize.innerWidth / 750) * 100 > 63 ? (windowSize.innerWidth / 750) * 100 : 62.5}%`
      document.documentElement.style.fontSize = fontSize
      setIsStyleSuccess(true)
    } else {
      document.documentElement.style.fontSize = '100%'
      setIsStyleSuccess(true)
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.innerWidth])

  useEffect(() => {
    setIsStyleSuccess(false)
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isH5Web])

  useEffect(() => {
    let pathname = history.location.pathname
    if (pathname.substring(0, 8) === '/auction') getData()
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, apiUrl, history])

  const getData = async () => {
    setLoading(true)
    if (apiKey === '' && apiUrl === '') {
      let list = await getAuctionListRedux({ constant, dispatch, toWeiFromWei, web3, Auction_ADDRESS })
      if (list && list instanceof Array) setLoading(false)
    }
    if (apiKey !== '' && apiUrl !== '') {
      let list = await getAuctionListReduxApi({ apiKey, apiUrl, dispatch, toWeiFromWei, web3, Auction_ADDRESS })
      if (list && list instanceof Array) setLoading(false)
    }
  }

  return (
    <Spin tip="loading..." spinning={loading} className="layout-loading">
      {!loading ? (
        children
      ) : (
        <LayoutWrapper style={{ background: 'transparent' }}>
          <div className="layout-tabber">
            <TopBar />
          </div>
          <NoDataAuctionWrapper />
          <Footer />
        </LayoutWrapper>
      )}
    </Spin>
  )
}

export default HooksProviderPage
