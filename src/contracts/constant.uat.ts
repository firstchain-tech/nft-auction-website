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
  4: 'https://rinkeby.infura.io/v3/a30cba5441a6482aa05efe0604e9268d',
}

export const injected = new InjectedConnector({ supportedChainIds: [4] })

export const walletconnect = (rpc: any, chainId: number) =>
  new WalletConnectConnector({
    rpc,
    chainId,
    qrcode: true,
    infuraId: 'a30cba5441a6482aa05efe0604e9268d',
  })

export const network = new NetworkConnector({
  urls: { 4: RPC_URLS[4] },
  defaultChainId: 4,
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.NetWork]: network,
}

export const defaultChainId = 4

export const useConstant = {
  4: {
    CHAIN_ID: 4,
    RPC_URL: 'https://rinkeby.infura.io/v3/a30cba5441a6482aa05efe0604e9268d',
    Auction_ADDRESS: '0xD9b0071Aa1383dA51849f68B75a363e1621d21D3',
    USDT_ADDRESS: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    apiUrl: '',
    apiKey: '',
  },
}

export const netWorks = {
  4: {
    chainId: web3.utils.numberToHex(42),
    isSwitch: true,
  },
  // 97: {
  //   chainId: web3.utils.numberToHex(97),
  //   chainName: 'BNB Smart Chain Testnet',
  //   nativeCurrency: {
  //     name: 'tBnb',
  //     symbol: 'tBnb',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  //   blockExplorerUrls: ['https://testnet.bscscan.com'],
  // },
}
