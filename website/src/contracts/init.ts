import ETH_ICON from '@/assets/token/ETH.svg'
import METAMASK_ICON from '@/assets/svg/metamask.svg'
import WALLET_CONNECT_ICON from '@/assets/svg/wallet-connect.svg'
import ETH_MIN from '@/assets/token/Ethereum-min.svg'

export interface listTypes {
  name: string
  icon: string
  chainId: any
  backgroundImage: string
  img: string
  fullName: string
}

export const NetWorkObj: any = {
  prd: [
    {
      name: 'Ethereum',
      fullName: 'Ethereum Mainnet',
      icon: ETH_ICON,
      img: ETH_MIN,
      chainId: 1,
      backgroundImage: 'linear-gradient(to right,#495EFC,#3F84EE)',
    },
  ],
  dev: [
    {
      name: 'Kovan',
      fullName: 'Kovan Testnet',
      icon: ETH_ICON,
      img: ETH_MIN,
      chainId: 42,
      backgroundImage: 'linear-gradient(to right,#495EFC,#3F84EE)',
    },
  ],
  uat: [
    {
      name: 'Kovan',
      fullName: 'Kovan Testnet',
      icon: ETH_ICON,
      img: ETH_MIN,
      chainId: 42,
      backgroundImage: 'linear-gradient(to right,#495EFC,#3F84EE)',
    },
  ],
}

export const walletInit: { name: string; icon: string; link: string }[] = [
  {
    name: 'Metamask',
    link: 'Injected',
    icon: METAMASK_ICON,
  },
  {
    name: 'WalletConnect',
    link: 'WalletConnect',
    icon: WALLET_CONNECT_ICON,
  },
]

export const StatusTypes: any = {
  '0': {
    borderColor: 'rgba(96, 35, 249,0)',
    background: 'rgba(96, 35, 249,.1)',
    color: '#5927EF',
    text: 'Bidding',
  },
  '1': {
    borderColor: 'rgba(96, 35, 249, 0.1)',
    background: 'rgba(96, 35, 249, 0.1)',
    color: 'rgba(89, 39, 239, 0.5)',
    text: 'Coming Soon',
  },
  '2': {
    borderColor: '#6023F9',
    background: '#FFFFFF',
    color: '#5927EF',
    text: 'In Progress',
  },
  '3': {
    borderColor: '#B3B3B3',
    background: 'rgba(193, 193, 193, .5)',
    color: 'rgba(0,0,0,.5)',
    text: 'Auction Closed',
  },
  '4': {
    borderColor: '#FFA0A4',
    background: '#FFCED2',
    color: '#F30000',
    text: 'Bidding Failure',
  },
}

export const ResponseCode: any = {
  0: 'Success',
  1: 'Fail',
  2: 'Incorrect parameter format',
  3: 'Number of times used up',
}
