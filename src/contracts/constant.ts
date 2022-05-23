import Auction from './abis/Auction.json'
import Token721 from './abis/721Token.json'
import Token1155 from './abis/1155Token.json'
import USDT from './abis/USDT.json'
import * as prdConstants from './constant.prd'
import * as uatConstants from './constant.uat'
import * as devConstants from './constant.dev'
import { NetWorkObj } from './init'

const constants: any = {
  prd: prdConstants,
  uat: uatConstants,
  dev: devConstants,
}

export interface ConnectorNamesType {
  src: 'Injected' | 'WalletConnect' | 'NetWork'
}

const { REACT_APP_ENV = 'prd' } = process.env
console.log('REACT_APP_ENV', REACT_APP_ENV)
export const { useConstant, RPC_URLS, injected, walletconnect, network, connectorsByName, defaultChainId, netWorks } =
  constants[REACT_APP_ENV]

export const netWorkInit = NetWorkObj[REACT_APP_ENV]

export const Auction_ABI: any = Auction
export const Token721_ABI: any = Token721
export const Token1155_ABI: any = Token1155
export const USDT_ABI: any = USDT

export const getActiveChainId = (arr: any, network: any) => {
  if (network === null) return false
  let objChainId = Object.keys(arr)
  let isTrue = objChainId.some((item) => item === network.toString())
  return isTrue
}
