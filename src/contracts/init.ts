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
