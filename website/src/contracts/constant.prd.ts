import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  NetWork = 'NetWork',
}

export interface ConnectorNamesType {
  src: 'Injected' | 'WalletConnect' | 'NetWork'
}

export const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}

export const injected = new InjectedConnector({ supportedChainIds: [1] })

export const walletconnect = (rpc: any, chainId: number) =>
  new WalletConnectConnector({
    rpc,
    chainId,
    qrcode: true,
    infuraId: '9aa3d95b3bc440fa88ea12eaa4456161',
  })

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1] },
  defaultChainId: 1,
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.NetWork]: network,
}

export const defaultChainId = 1

export const useConstant = {
  1: {
    CHAIN_ID: 1,
    RPC_URL: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    Auction_ADDRESS: '',
    USDT_ADDRESS: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    apiUrl: '',
    apiKey: '',
  },
}

export const netWorks = {
  1: {
    chainId: web3.utils.numberToHex(1),
    isSwitch: true,
  },
}
