import type { AuctionListType, OffersListType, ArrRequestType } from '@/common/data.d'
import { useEffect, useState } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import type { ConstantInitTypes } from '@/contracts/constantInit'
import { readGetPastEvents, readGetApiEvents } from '@/common'
import { formatMsgTime } from '@/utils'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

interface Type {
  key: AuctionListType
  myAddress: string
  isRefreshData: boolean
}

export const useAuctionHooks = (props: Type) => {
  const { key, myAddress, isRefreshData } = props
  const CURRENT_TIMESTAMP = new BigNumber(moment().format('X')).plus(3).toString()

  let history = useHistory()
  const dataInit: ConstantInitTypes = useDataHooks()
  const { constant, apiKey, apiUrl, web3, toWeiFromWei, Auction_ADDRESS } = dataInit

  const [loading, setLoading] = useState<boolean>(true)
  const [offersList, setOffersList] = useState<OffersListType[]>([])
  const [isHightPrice, setIsHightPrice] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState<string>('1')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isParticipate, setIsParticipate] = useState<boolean>(false)
  const [isReceive, setIsReceive] = useState<boolean>(false)
  const localContractAddress = localStorage.getItem('contract_address') || undefined
  const [timeFinish, setTimeFinish] = useState<any>(() => {
    if (key && key.finish) return key.finish
    return ''
  })

  const [bottomStatus, setBottomStatus] = useState<'1' | '2' | '3'>(() => {
    if (key) {
      if (CURRENT_TIMESTAMP < key.opening) return '1'
      else if (CURRENT_TIMESTAMP >= key.opening && CURRENT_TIMESTAMP < key.finish) return '2'
      else return '3'
    } else return '1'
  })

  useEffect(() => {
    if (key) {
      setLoading(true)
      setLoading(true)
      setIsParticipate(false)
      setStatus('1')
      setIsSuccess(false)
      setOffersList([])
      setIsHightPrice(undefined)
      setTimeFinish(key.finish)
      if (apiKey === '' && apiUrl === '') {
        getOffersList()
        getIsReceive()
      }
      if (apiKey !== '' && apiUrl !== '') getOffersListApi()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, apiKey, apiUrl, myAddress, isRefreshData])

  useEffect(() => {
    if (key) {
      if (CURRENT_TIMESTAMP < key.opening) setBottomStatus('1')
      else if (CURRENT_TIMESTAMP >= key.opening && CURRENT_TIMESTAMP < key.finish) setBottomStatus('2')
      else return setBottomStatus('3')
    } else return setBottomStatus('1')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, isRefreshData])

  const getStatusKey = async () => {
    if (CURRENT_TIMESTAMP < key.opening) setStatus('1')
    if (CURRENT_TIMESTAMP >= key.opening && CURRENT_TIMESTAMP < key.finish) setStatus('2')
    if (CURRENT_TIMESTAMP >= key.finish) setStatus('4')
  }

  const getOffersList = async () => {
    try {
      getStatusKey()
      let bidedSource: any = await readGetPastEvents(constant.ContractAuction, 'Bided')
      let bidedData: any[] = []
      bidedSource.data.forEach((element: any, index: number) => {
        let obj = {
          index,
          collectibleHash: element.returnValues.collectibleHash,
          bidder: element.returnValues.bidder,
          price: element.returnValues.price,
          finish: element.returnValues.finish,
          blockNumber: element.blockNumber,
        }
        bidedData.push(obj)
      })
      if (bidedSource.data.length === 0 && localContractAddress !== Auction_ADDRESS) history.replace('/home')
      let arr = bidedData.filter((item) => item.collectibleHash.toLowerCase() === key.collectibleHash.toLowerCase())
      let DATA_LIST: OffersListType[] = []
      for (let i = 0; i < arr.length; i++) {
        let element = arr[i]
        let timestamps = await (await web3.eth.getBlock(element.blockNumber)).timestamp
        let expiration = formatMsgTime(timestamps)
        let current_price: any = toWeiFromWei(element.price)
        let floorDifference =
          i === 0
            ? new BigNumber(current_price).minus(key.totalPrice).div(key.totalPrice).times(100)
            : new BigNumber(current_price)
                .minus(toWeiFromWei(arr[i - 1].price) as any)
                .div(toWeiFromWei(arr[i - 1].price) as any)
                .times(100)
        let obj: OffersListType = {
          ...element,
          expiration,
          key: i.toString(),
          floorDifference: `${Number(floorDifference).toFixed(2)}% below`,
          isHight: false,
        }
        DATA_LIST.push(obj)
      }
      DATA_LIST.sort(function (a: any, b: any) {
        return b.price - a.price
      })
      DATA_LIST.forEach((item, index) => {
        if (index === 0) {
          item.isHight = true
          let price: any = toWeiFromWei(item.price)
          setIsHightPrice(price)
          setTimeFinish(item.finish)
        }
        if (myAddress && myAddress.toLowerCase() === item.bidder.toLowerCase()) {
          if (CURRENT_TIMESTAMP >= key.finish) {
            setIsParticipate(true)
            if (index === 0) setStatus('3')
            if (index !== 0) {
            } else setIsSuccess(true)
          }
        }
      })
      if (myAddress && myAddress.toLowerCase() === key.seller.toLowerCase()) {
        let arr_no = DATA_LIST.filter((item) => item.bidder.toLowerCase() === myAddress.toLowerCase())
        if (CURRENT_TIMESTAMP >= key.opening && arr_no.length === 0 && DATA_LIST.length !== 0) setStatus('0')
      }
      if (myAddress && myAddress.toLowerCase() !== key.seller.toLowerCase()) {
        let arr_no = DATA_LIST.filter((item) => item.bidder.toLowerCase() === myAddress.toLowerCase())
        if (CURRENT_TIMESTAMP >= key.finish && arr_no.length === 0) setStatus('3')
      }
      if (!myAddress) {
        if (CURRENT_TIMESTAMP >= key.finish) setStatus('3')
      }
      setOffersList(
        DATA_LIST.sort(function (a: any, b: any) {
          return b.blockNumber - a.blockNumber
        }),
      )
      console.log('DATA_LIST', DATA_LIST)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  const getIsReceive = async () => {
    try {
      let purchasedSource: any = await readGetPastEvents(constant.ContractAuction, 'Purchased')
      let purchasedData: any[] = []
      for (let i = 0; i < purchasedSource.data.length; i++) {
        let element = purchasedSource.data[i]
        if (element.returnValues.collectibleHash.toLowerCase() === key.collectibleHash.toLowerCase())
          purchasedData.push({
            tokenId: element.returnValues.tokenId,
            index: i,
            collectibleHash: element.returnValues.collectibleHash,
            purchaser: element.returnValues.purchaser,
            blockNumber: element.blockNumber,
            collection: element.returnValues.collection,
            amount: element.returnValues.amount,
          })
      }
      let obj = purchasedData.find((item) => item.purchaser.toLowerCase() === myAddress.toLowerCase())
      if (obj && obj.purchaser) setIsReceive(true)
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  const getOffersListApi = async () => {
    try {
      getStatusKey()
      let topic0Bided = await web3.utils.sha3('Bided(bytes32,address,uint256,uint256)')
      let topic0Purchased = await web3.utils.sha3('Purchased(bytes32,address,address,uint256,uint256)')
      let arrRequest: ArrRequestType[] = [
        { address: Auction_ADDRESS, apiKey, apiUrl, topic0: topic0Bided, eventNme: 'Bided' },
        { address: Auction_ADDRESS, apiKey, apiUrl, topic0: topic0Purchased, eventNme: 'Purchased' },
      ]
      let arrPromis: any[] = await Promise.all([readGetApiEvents(arrRequest[0]), readGetApiEvents(arrRequest[1])])
      let bidedSource: any = arrPromis[0].result
      let parameterArrayBided = ['bytes32', 'address', 'uint256', 'uint256']
      getIsReceiveApi(arrPromis[1].result)

      let bidedData: any[] = []
      bidedSource.forEach((element: any, index: number) => {
        let blockNumber = web3.utils.hexToNumber(element.blockNumber)
        let parameters = web3.eth.abi.decodeParameters(parameterArrayBided, element.data)
        let obj = {
          index,
          collectibleHash: parameters[0],
          bidder: parameters[1],
          price: parameters[2],
          finish: parameters[3],
          blockNumber,
        }
        bidedData.push(obj)
      })
      if (bidedSource.length === 0 && localContractAddress !== Auction_ADDRESS) history.replace('/home')
      let arr = bidedData.filter((item) => item.collectibleHash.toLowerCase() === key.collectibleHash.toLowerCase())
      let DATA_LIST: OffersListType[] = []
      for (let i = 0; i < arr.length; i++) {
        let element = arr[i]
        let timestamps = await (await web3.eth.getBlock(element.blockNumber)).timestamp
        let expiration = formatMsgTime(timestamps)
        let current_price: any = toWeiFromWei(element.price)
        let floorDifference =
          i === 0
            ? new BigNumber(current_price).minus(key.totalPrice).div(key.totalPrice).times(100)
            : new BigNumber(current_price)
                .minus(toWeiFromWei(arr[i - 1].price) as any)
                .div(toWeiFromWei(arr[i - 1].price) as any)
                .times(100)
        let obj: OffersListType = {
          ...element,
          expiration,
          key: i.toString(),
          floorDifference: `${Number(floorDifference).toFixed(2)}% below`,
          isHight: false,
        }
        DATA_LIST.push(obj)
      }
      DATA_LIST.sort(function (a: any, b: any) {
        return b.price - a.price
      })
      DATA_LIST.forEach((item, index) => {
        if (index === 0) {
          item.isHight = true
          let price: any = toWeiFromWei(item.price)
          setIsHightPrice(price)
          setTimeFinish(item.finish)
        }
        if (myAddress && myAddress.toLowerCase() === item.bidder.toLowerCase()) {
          if (CURRENT_TIMESTAMP >= key.finish) {
            setIsParticipate(true)
            if (index === 0) setStatus('3')
            if (index !== 0) {
            } else setIsSuccess(true)
          }
        }
      })
      if (myAddress && myAddress.toLowerCase() === key.seller.toLowerCase()) {
        let arr_no = DATA_LIST.filter((item) => item.bidder.toLowerCase() === myAddress.toLowerCase())
        if (CURRENT_TIMESTAMP >= key.opening && arr_no.length === 0 && DATA_LIST.length !== 0) setStatus('0')
      }
      if (myAddress && myAddress.toLowerCase() !== key.seller.toLowerCase()) {
        let arr_no = DATA_LIST.filter((item) => item.bidder.toLowerCase() === myAddress.toLowerCase())
        if (CURRENT_TIMESTAMP >= key.finish && arr_no.length === 0) setStatus('3')
      }
      if (!myAddress) {
        if (CURRENT_TIMESTAMP >= key.finish) setStatus('3')
      }
      setOffersList(
        DATA_LIST.sort(function (a: any, b: any) {
          return b.blockNumber - a.blockNumber
        }),
      )
      console.log('DATA_LIST', DATA_LIST)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  const getIsReceiveApi = async (purchasedSource: any) => {
    try {
      let purchasedData: any[] = []
      let parameterArrayPurchased = ['bytes32', 'uint256', 'uint256']
      for (let i = 0; i < purchasedSource.length; i++) {
        let element = purchasedSource[i]
        // let blockNumber = web3.utils.hexToNumber(element.blockNumber)
        let parameters = web3.eth.abi.decodeParameters(parameterArrayPurchased, element.data)
        let obj = {
          collectibleHash: parameters[0],
          purchaser: `0x${element.topics[1].substring(26, element.topics[1].length)}`,
          collection: `0x${element.topics[2].substring(26, element.topics[2].length)}`,
          tokenId: parameters[1],
          amount: parameters[2],
        }
        if (obj.collectibleHash.toLowerCase() === key.collectibleHash.toLowerCase())
          purchasedData.push({
            ...obj,
            index: i,
          })
      }
      let obj = purchasedData.find((item) => item.purchaser.toLowerCase() === myAddress.toLowerCase())
      if (obj && obj.purchaser) setIsReceive(true)
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  return { bottomStatus, offersList, loading, isHightPrice, status, isSuccess, isParticipate, isReceive, timeFinish }
}
