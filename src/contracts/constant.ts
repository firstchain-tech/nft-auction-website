import Auction from './abis/Auction.json'
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

export const getActiveChainId = (arr: any, network: any) => {
  if (network === null) return false
  let objChainId = Object.keys(arr)
  let isTrue = objChainId.some((item) => item === network.toString())
  return isTrue
}
