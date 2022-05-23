import Web3 from 'web3'
import { Auction_ABI, USDT_ABI, useConstant } from './constant'

export interface ConstantBallTypes {
  ContractAuction: any
  ContractUsdt: any
}

export interface ConstantInitTypes {
  web3: Web3
  constant: ConstantBallTypes
  Auction_ADDRESS: string
  USDT_ADDRESS: string
  apiUrl: string
  apiKey: string
  toWeiFromWei: (s: any) => void
}

export class ConstantInit {
  web3: Web3
  constant: ConstantBallTypes
  Auction_ADDRESS: string
  USDT_ADDRESS: string
  apiUrl: string
  apiKey: string

  constructor(provider: any, chainId: string) {
    const { Auction_ADDRESS, apiUrl, apiKey, USDT_ADDRESS } = useConstant[chainId]

    this.web3 = new Web3(provider)
    this.Auction_ADDRESS = Auction_ADDRESS
    this.USDT_ADDRESS = USDT_ADDRESS
    this.apiKey = apiKey
    this.apiUrl = apiUrl
    this.constant = {
      ContractAuction: new this.web3.eth.Contract(Auction_ABI, Auction_ADDRESS),
      ContractUsdt: new this.web3.eth.Contract(USDT_ABI, USDT_ADDRESS),
    }
  }

  toWeiFromWei = (number: any) => {
    let data = this.web3.utils.fromWei(number, 'ether')
    return Number(data).toFixed(2)
  }
}
