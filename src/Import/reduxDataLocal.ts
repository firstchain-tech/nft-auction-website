import { SaveInfoWeb3Storage } from '@/store/info/action'
import type { AuctionListType, ArrRequestType } from '@/common/data.d'
import {
  readGetPastEvents,
  readGetApiEvents,
  getContractsUriData,
  getLocalStorageSize,
  getArrGrouping,
  getLocal,
  getLocalRemove,
} from '@/common'
import { objArrayDuplicateRemovalHash } from '@/utils'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import AUCTION_DEFAULT_IMAGE from '@/assets/auction-default.png'
import Web3 from 'web3'
import { ConstantBallTypes } from '@/contracts/constantInit'

interface Type {
  constant: ConstantBallTypes
  dispatch: any
  toWeiFromWei: any
  web3: Web3
  Auction_ADDRESS: any
}

interface ApiType {
  apiKey: string
  apiUrl: string
  dispatch: any
  toWeiFromWei: any
  web3: Web3
  Auction_ADDRESS: any
}

const AUCTION_LOCAL = 'item_acution_number'

export const getAuctionListRedux = async ({ constant, dispatch, toWeiFromWei, web3, Auction_ADDRESS }: Type) => {
  try {
    let collectibleAddedSource: any = await readGetPastEvents(constant.ContractAuction, 'CollectibleAdded')
    let collectibleRemovedSource: any = await readGetPastEvents(constant.ContractAuction, 'CollectibleRemoved')
    let bidedSource: any = await readGetPastEvents(constant.ContractAuction, 'Bided')
    let bidedData: any[] = []
    let collectibleAddedData: any[] = []
    let collectibleRemovedData: any[] = []
    collectibleAddedSource.data.forEach((element: any, index: number) => {
      let obj = {
        amount: element.returnValues.amount,
        collectibleHash: element.returnValues.collectibleHash,
        collection: element.returnValues.collection,
        currency: element.returnValues.currency,
        finish: element.returnValues.finish,
        opening: element.returnValues.opening,
        price: element.returnValues.price,
        seller: element.returnValues.seller,
        tokenId: element.returnValues.tokenId,
        blockNumber: element.blockNumber,
      }
      collectibleAddedData.push(obj)
    })
    collectibleRemovedSource.data.forEach((element: any, index: number) => {
      let obj = {
        index,
        collectibleHash: element.returnValues.collectibleHash,
        blockNumber: element.blockNumber,
      }
      collectibleRemovedData.push(obj)
    })
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
    let addedRemoveData: any[] = collectibleAddedData.filter(
      (item) => !collectibleRemovedData.some((ele) => ele.collectibleHash.toLowerCase() === item.collectibleHash.toLowerCase()),
    )
    let addedFilter: any[] = objArrayDuplicateRemovalHash(
      addedRemoveData.sort(function (a: any, b: any) {
        return b.blockNumber - a.blockNumber
      }),
    )
    let bidedFilter: any[] = objArrayDuplicateRemovalHash(
      bidedData.sort(function (a: any, b: any) {
        return b.blockNumber - a.blockNumber
      }),
    )
    if (addedFilter.length === 0) getLocalRemove(AUCTION_LOCAL)
    const LOCAL_DATA: any[] = addedFilter.length === 0 ? [] : await getLocal(AUCTION_LOCAL)
    let localArr = addedFilter.filter(
      (item) => !LOCAL_DATA.some((ele) => ele.collectibleHash.toLowerCase() === item.collectibleHash.toLowerCase()),
    )
    if (LOCAL_DATA.length !== addedFilter.length) {
      localStorage.removeItem('contract_address')
      getLocalRemove(AUCTION_LOCAL)
    }
    if (localArr.length === 0) {
      LOCAL_DATA.forEach((item) => {
        let obj = bidedFilter.find((ite) => ite.collectibleHash.toLowerCase() === item.collectibleHash.toLowerCase())
        if (obj && obj.finish) {
          item.finish = obj.finish
          let finishEnd = new BigNumber(obj.finish).times(1000)
          let endTime = moment(Number(finishEnd)).format('YYYY/MM/DD HH:mm:ss')
          item.endTime = endTime
        }
      })
      dispatch(SaveInfoWeb3Storage(LOCAL_DATA))
      return await LOCAL_DATA
    }
    if (localArr.length !== 0) {
      localStorage.removeItem('contract_address')
      getLocalRemove(AUCTION_LOCAL)
    }
    let DATA_LIST: AuctionListType[] = []
    for (let i = 0; i < addedFilter.length; i++) {
      let item = addedFilter[i]
      let openingStart = new BigNumber(item.opening).times(1000)
      let finishEnd = new BigNumber(item.finish).times(1000)
      let startTime = moment(Number(openingStart)).format('YYYY/MM/DD HH:mm:ss')
      let endTime = moment(Number(finishEnd)).format('YYYY/MM/DD HH:mm:ss')
      let axiosData = await getContractsUriData(item.collection, web3, item.tokenId)
      let pricWei: any = toWeiFromWei(item.price)
      let bigNumberPrice = new BigNumber(pricWei).times(item.amount)
      let obj: AuctionListType = {
        ...item,
        iamge: axiosData.imageFiles || axiosData.image || AUCTION_DEFAULT_IMAGE,
        name: axiosData.name || `McGrady Moment #${item.tokenId}`,
        key: i.toString(),
        startTime,
        endTime,
        totalPrice: Number(bigNumberPrice).toFixed(2),
        numberKey: `${item.blockNumber}${item.tokenId}${item.amount}`,
      }
      DATA_LIST.push(obj)
    }
    DATA_LIST.forEach((item) => {
      let obj = bidedFilter.find((ite) => ite.collectibleHash.toLowerCase() === item.collectibleHash.toLowerCase())
      if (obj && obj.finish) {
        item.finish = obj.finish
        let finishEnd = new BigNumber(obj.finish).times(1000)
        let endTime = moment(Number(finishEnd)).format('YYYY/MM/DD HH:mm:ss')
        item.endTime = endTime
      }
    })
    if (DATA_LIST.length > 0) {
      let sizeObj = getLocalStorageSize(JSON.stringify(DATA_LIST))
      let sizeArrLength = Math.ceil(sizeObj.size / 5242880)
      let newResult = await getArrGrouping(DATA_LIST, Math.ceil(DATA_LIST.length / sizeArrLength))
      localStorage.setItem(AUCTION_LOCAL, newResult.length.toString())
      localStorage.setItem('contract_address', Auction_ADDRESS)
      for (let i = 0; i < newResult.length; i++) {
        localStorage.setItem(`${AUCTION_LOCAL}_${i}`, JSON.stringify(newResult[i]))
      }
    }
    DATA_LIST.sort(function (a: any, b: any) {
      return b.blockNumber - a.blockNumber
    })
    dispatch(SaveInfoWeb3Storage(DATA_LIST))
    return await DATA_LIST
  } catch (error) {
    return await []
  }
}

export const getAuctionListReduxApi = async ({ apiKey, apiUrl, dispatch, toWeiFromWei, web3, Auction_ADDRESS }: ApiType) => {
  try {
    let topic0CollectibleAdded = await web3.utils.sha3(
      'CollectibleAdded(bytes32,address,address,uint256,uint256,address,uint256,uint256,uint256)',
    )
    let topic0CollectibleRemoved = await web3.utils.sha3('CollectibleRemoved(bytes32)')
    let topic0Bided = await web3.utils.sha3('Bided(bytes32,address,uint256,uint256)')
    let arrRequest: ArrRequestType[] = [
      { address: Auction_ADDRESS, apiKey, apiUrl, topic0: topic0CollectibleAdded, eventNme: 'CollectibleAdded' },
      { address: Auction_ADDRESS, apiKey, apiUrl, topic0: topic0CollectibleRemoved, eventNme: 'CollectibleRemoved' },
      { address: Auction_ADDRESS, apiKey, apiUrl, topic0: topic0Bided, eventNme: 'Bided' },
    ]
    let arrPromis: any[] = await Promise.all([
      readGetApiEvents(arrRequest[0]),
      readGetApiEvents(arrRequest[1]),
      readGetApiEvents(arrRequest[2]),
    ])
    let collectibleAddedSource: any = arrPromis[0].result
    let collectibleRemovedSource: any = arrPromis[1].result
    let bidedSource: any = arrPromis[2].result

    let collectibleAddedData: any[] = []
    let collectibleRemovedData: any[] = []
    let bidedData: any[] = []

    let parameterArrayCollectibleAdded = ['bytes32', 'uint256', 'uint256', 'address', 'uint256', 'uint256', 'uint256']
    let parameterArrayCollectibleRemoved = ['bytes32']
    let parameterArrayBided = ['bytes32', 'address', 'uint256', 'uint256']

    collectibleAddedSource.forEach((element: any, index: number) => {
      let blockNumber = web3.utils.hexToNumber(element.blockNumber)
      let parameters = web3.eth.abi.decodeParameters(parameterArrayCollectibleAdded, element.data)
      let obj = {
        amount: parameters[2],
        collectibleHash: parameters[0],
        collection: `0x${element.topics[2].substring(26, element.topics[2].length)}`,
        currency: parameters[3],
        finish: parameters[6],
        opening: parameters[5],
        price: parameters[4],
        seller: `0x${element.topics[1].substring(26, element.topics[1].length)}`,
        tokenId: parameters[1],
        blockNumber,
      }
      collectibleAddedData.push(obj)
    })
    collectibleRemovedSource.forEach((element: any, index: number) => {
      let blockNumber = web3.utils.hexToNumber(element.blockNumber)
      let parameters = web3.eth.abi.decodeParameters(parameterArrayCollectibleRemoved, element.data)
      let obj = {
        index,
        collectibleHash: parameters[0],
        blockNumber,
      }
      collectibleRemovedData.push(obj)
    })
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
    let addedRemoveData: any[] = collectibleAddedData.filter(
      (item) => !collectibleRemovedData.some((ele) => ele.collectibleHash.toLowerCase() === item.collectibleHash.toLowerCase()),
    )
    let addedFilter: any[] = objArrayDuplicateRemovalHash(
      addedRemoveData.sort(function (a: any, b: any) {
        return b.blockNumber - a.blockNumber
      }),
    )
    let bidedFilter: any[] = objArrayDuplicateRemovalHash(
      bidedData.sort(function (a: any, b: any) {
        return b.blockNumber - a.blockNumber
      }),
    )
    if (addedFilter.length === 0) getLocalRemove(AUCTION_LOCAL)
    const LOCAL_DATA: any[] = addedFilter.length === 0 ? [] : await getLocal(AUCTION_LOCAL)
    let localArr = addedFilter.filter(
      (item) => !LOCAL_DATA.some((ele) => ele.collectibleHash.toLowerCase() === item.collectibleHash.toLowerCase()),
    )
    if (LOCAL_DATA.length !== addedFilter.length) {
      localStorage.removeItem('contract_address')
      getLocalRemove(AUCTION_LOCAL)
    }
    if (localArr.length === 0) {
      LOCAL_DATA.forEach((item) => {
        let obj = bidedFilter.find((ite) => ite.collectibleHash.toLowerCase() === item.collectibleHash.toLowerCase())
        if (obj && obj.finish) {
          item.finish = obj.finish
          let finishEnd = new BigNumber(obj.finish).times(1000)
          let endTime = moment(Number(finishEnd)).format('YYYY/MM/DD HH:mm:ss')
          item.endTime = endTime
        }
      })
      dispatch(SaveInfoWeb3Storage(LOCAL_DATA))
      return await LOCAL_DATA
    }
    if (localArr.length !== 0) {
      localStorage.removeItem('contract_address')
      getLocalRemove(AUCTION_LOCAL)
    }
    let DATA_LIST: AuctionListType[] = []
    for (let i = 0; i < addedFilter.length; i++) {
      let item = addedFilter[i]
      let openingStart = new BigNumber(item.opening).times(1000)
      let finishEnd = new BigNumber(item.finish).times(1000)
      let startTime = moment(Number(openingStart)).format('YYYY/MM/DD HH:mm:ss')
      let endTime = moment(Number(finishEnd)).format('YYYY/MM/DD HH:mm:ss')
      let axiosData = await getContractsUriData(item.collection, web3, item.tokenId)
      let pricWei: any = toWeiFromWei(item.price)
      let bigNumberPrice = new BigNumber(pricWei).times(item.amount)
      let obj: AuctionListType = {
        ...item,
        iamge: axiosData.imageFiles || axiosData.image || AUCTION_DEFAULT_IMAGE,
        name: axiosData.name || `McGrady Moment #${item.tokenId}`,
        key: i.toString(),
        startTime,
        endTime,
        totalPrice: Number(bigNumberPrice).toFixed(2),
        numberKey: `${item.blockNumber}${item.tokenId}${item.amount}`,
      }
      DATA_LIST.push(obj)
    }
    DATA_LIST.forEach((item) => {
      let obj = bidedFilter.find((ite) => ite.collectibleHash.toLowerCase() === item.collectibleHash.toLowerCase())
      if (obj && obj.finish) {
        item.finish = obj.finish
        let finishEnd = new BigNumber(obj.finish).times(1000)
        let endTime = moment(Number(finishEnd)).format('YYYY/MM/DD HH:mm:ss')
        item.endTime = endTime
      }
    })
    if (DATA_LIST.length > 0) {
      let sizeObj = getLocalStorageSize(JSON.stringify(DATA_LIST))
      let sizeArrLength = Math.ceil(sizeObj.size / 5242880)
      let newResult = await getArrGrouping(DATA_LIST, Math.ceil(DATA_LIST.length / sizeArrLength))
      localStorage.setItem(AUCTION_LOCAL, newResult.length.toString())
      localStorage.setItem('contract_address', Auction_ADDRESS)
      for (let i = 0; i < newResult.length; i++) {
        localStorage.setItem(`${AUCTION_LOCAL}_${i}`, JSON.stringify(newResult[i]))
      }
    }
    DATA_LIST.sort(function (a: any, b: any) {
      return b.blockNumber - a.blockNumber
    })
    dispatch(SaveInfoWeb3Storage(DATA_LIST))
    return await LOCAL_DATA
  } catch (error) {
    return await []
  }
}
