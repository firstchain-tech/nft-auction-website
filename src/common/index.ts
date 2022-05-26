import type { ArrRequestType } from '@/common/data.d'
import request from '@/utils/request'
import { Token1155_ABI, Token721_ABI } from '@/contracts/constant'
import Web3 from 'web3'
import bs58 from 'bs58'
import axios from 'axios'

export const getBytes32FromIpfsHash = (ipfsListing: any) => {
  return '0x' + bs58.decode(ipfsListing).slice(2).toString('hex')
}

export const getIpfsHashFromBytes32 = (bytes32Hex: any) => {
  const hashHex = '1220' + bytes32Hex.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex')
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

/** read historical events  */
export const readGetPastEvents = (contract: any, events: string, filter?: object) => {
  return new Promise((reslove, reject) => {
    contract.getPastEvents(events, { fromBlock: 0, toBlock: 'latest', filter: { ...filter } }, function (error: any, event: any) {
      if (event instanceof Array) {
        reslove({ data: event, error: null })
      } else {
        console.log('events', events)
        console.log('error', error)
        reslove({ data: [], error })
      }
    })
  })
}

export const readGetApiEvents = (obj: ArrRequestType) =>
  request(`${obj.apiUrl}?module=logs&action=getLogs&fromBlock=0&address=${obj.address}&topic0=${obj.topic0}&apikey=${obj.apiKey}`)

const ABILIST: any = {
  1155: Token1155_ABI,
  721: Token721_ABI,
}

const ABILIST_ID: any = {
  1155: '0xd9b67a26',
  721: '0x80ac58cd',
}

export const getContractsUriData = async (constantAddress: string, web3: Web3, tokenId: string) => {
  let constant721 = new web3.eth.Contract(ABILIST[721], constantAddress)
  let constant1155 = new web3.eth.Contract(ABILIST[1155], constantAddress)
  let data721 = await constant721.methods.supportsInterface(ABILIST_ID[721]).call()
  if (data721) {
    return await getContractsUriDataTwo721(constant721, web3, constantAddress, tokenId)
  } else {
    let data1155 = await constant1155.methods.supportsInterface(ABILIST_ID[1155]).call()
    if (data1155) {
      return await getContractsUriDataTwo1155(constant1155, web3, constantAddress, tokenId)
    } else return await {}
  }
}

const getContractsUriDataTwo721 = async (constant: any, web3: Web3, constantAddress: string, tokenId: string) => {
  let uri = await constant.methods.tokenURI(tokenId).call()

  let base64 = uri.length > 2 ? uri.substring(0, 2) : ''
  if (base64 === '0x' && uri.length === 66) return await currentWeb3StorageJson(uri)

  let length = uri.indexOf(':')
  let str = uri.substring(0, length)
  if (str === 'http' || str === 'https') return await GetIPFSJson(uri)
  if (str === 'ipfs') {
    let ipfsUrl = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
    let data: any = await GetIPFSJson(ipfsUrl)
    if (data.image && data.image.substring(0, data.image.indexOf(':')) === 'ipfs')
      data.image = data.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
    if (data.animation_url && data.animation_url.substring(0, data.animation_url.indexOf(':')) === 'ipfs')
      data.animation_url = data.animation_url.replace('ipfs://', 'https://ipfs.io/ipfs/')
    return await data
  }
  return await {}
}

const getContractsUriDataTwo1155 = async (constant: any, web3: Web3, constantAddress: string, tokenId: string) => {
  let uri = await constant.methods.uri(tokenId).call()

  let base64 = uri.length > 2 ? uri.substring(0, 2) : ''
  if (base64 === '0x' && uri.length === 66) return await currentWeb3StorageJson(uri)

  let length = uri.indexOf(':')
  let str = uri.substring(0, length)
  if (str === 'http' || str === 'https') return await GetIPFSJson(uri)
  if (str === 'ipfs') {
    let ipfsUrl = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
    return await GetIPFSJson(ipfsUrl)
  }
  return await {}
}

const currentWeb3StorageJson = async (uri: string) => {
  try {
    let cid = getIpfsHashFromBytes32(uri)
    let axiosDataFetch = await axios.get(`https://api.web3.storage/car/${cid}`)
    let json = axiosDataFetch.data.substr(axiosDataFetch.data.indexOf(`{"`), axiosDataFetch.data.length)
    let axiosData: any = await JSON.parse(json)
    return await axiosData
  } catch (error) {
    return await {}
  }
}

export const GetIPFSJson = async (uri: string) => {
  try {
    let axiosData = {}
    let res = await axios.get(uri)
    if (res && res.status === 200 && res.data) axiosData = res.data
    return await axiosData
  } catch (error) {
    return await {}
  }
}

export const getLocalStorageSize = (str: string) => {
  let size = JSON.stringify(str).length * 2
  const arr = ['bytes', 'KB', 'MB', 'GB', 'TB']
  let sizeUnit = 0
  while (size > 1024) {
    size /= 1024
    ++sizeUnit
  }
  return {
    size: Math.ceil(size),
    name: `size:${size.toFixed(2)}${arr[sizeUnit]}`,
  }
}

export const getArrGrouping = async (arr: any[], size: number) => {
  const arrNum = Math.ceil(arr.length / size)
  let index = 0 // 定义初始索引
  let resIndex = 0 // 用来保存每次拆分的长度
  const result = []
  while (index < arrNum) {
    result[index] = arr.slice(resIndex, size + resIndex)
    resIndex += size
    index++
  }
  return result
}

export const getLocal = async (str: string) => {
  let localLength = localStorage.getItem(str) || '0'
  let localWeb3StorageList = []
  for (let i = 0; i < Number(localLength); i++) {
    let obj: any = localStorage.getItem(`${str}_${i}`) || JSON.stringify([])
    let listObj = JSON.parse(obj)
    localWeb3StorageList.push(...listObj)
  }
  return await localWeb3StorageList
}

export const getLocalRemove = async (str: string) => {
  let localLength = localStorage.getItem(str) || '0'
  for (let i = 0; i < Number(localLength); i++) {
    localStorage.removeItem(`${str}_${i}`)
  }
  setTimeout(() => {
    localStorage.removeItem(str)
  }, 50)
}
