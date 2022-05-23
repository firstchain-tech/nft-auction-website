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
  42: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}

export const injected = new InjectedConnector({ supportedChainIds: [42] })

export const walletconnect = (rpc: any, chainId: number) =>
  new WalletConnectConnector({
    rpc,
    chainId,
    qrcode: true,
    infuraId: '9aa3d95b3bc440fa88ea12eaa4456161',
  })

export const network = new NetworkConnector({
  urls: { 42: RPC_URLS[42] },
  defaultChainId: 42,
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.NetWork]: network,
}

export const defaultChainId = 42

export const useConstant = {
  42: {
    CHAIN_ID: 42,
    RPC_URL: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    Auction_ADDRESS: '0xb4BF5Ff9D132512B9bA2AFcE78D61Cc4cB2CaB66',
    USDT_ADDRESS: '0x329DfE37F866367f0652786848885F3AFC90cCC6',
    apiUrl: '',
    apiKey: '',
  },
}

export const netWorks = {
  42: {
    chainId: web3.utils.numberToHex(42),
    isSwitch: true,
  },
}
