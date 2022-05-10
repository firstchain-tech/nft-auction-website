import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected, walletconnect } from '@/contracts/constant'
import { useSelector, useDispatch } from 'react-redux'
import { SaveIsLogin, SaveWallet } from '@/store/wallet/action'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { getActiveChainId } from '@/contracts/constant'
import { RPC_URLS } from '@/contracts/constant'
import { SaveNetwork } from '@/store/wallet/action'

/** Automatically link Metamask */
export function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [tried, setTried] = useState(false)

  const dispatch = useDispatch()
  const walletInfo = useSelector((state: any) => state.walletInfo)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized && walletInfo.islogin && walletInfo.wallet === 'Injected') {
        activate(injected, undefined, true)
          .then(() => {
            dispatch(SaveIsLogin(true))
            dispatch(SaveWallet('Injected'))
            localStorage.setItem('wallet', 'Injected')
            localStorage.setItem('isLogin', 'true')
          })
          .catch(() => {
            setTried(true)
          })
      } else {
        setTried(true)
      }
    })
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])
  return tried
}

/** Metamask user unauthorized listener switch network */
export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React()
  const dispatch = useDispatch()

  /* eslint-disable */
  const setActivateChange = (networkId: any) => {
    let isTrue = getActiveChainId(RPC_URLS, Number(networkId))
    if (!isTrue) return
    activate(injected, undefined, true)
      .then(() => {
        dispatch(SaveIsLogin(true))
        dispatch(SaveWallet('Injected'))
        localStorage.setItem('wallet', 'Injected')
        localStorage.setItem('isLogin', 'true')
      })
      .catch(() => {})
  }
  /* eslint-disable */

  useEffect((): any => {
    // @ts-ignore
    const { ethereum } = window
    if (ethereum) {
      ethereum.on &&
        ethereum.on('networkChanged', function () {
          window.location.reload()
        })
    }
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        // setActivateChange(networkId)
        dispatch(SaveNetwork(Number(networkId)))
        localStorage.setItem('chainId', networkId.toString())
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, error, suppress, activate])
}

/** walletconnect user authorization listener  */
export const useWalletConnectListener = () => {
  const dispatch = useDispatch()

  const { deactivate, library, activate, active, error } = useWeb3React()
  const walletInfo = useSelector((state: any) => state.walletInfo)

  useEffect(() => {
    let timer: any = 0
    if (library && library.provider instanceof WalletConnectProvider) {
      timer = setInterval(() => {
        if (!library.provider.connected) {
          deactivate()
          clearInterval(timer)
        }
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library])

  useEffect(() => {
    if (library && library.provider instanceof WalletConnectProvider) {
      library.provider.on('chainChanged', handleChainChanged)
      library.provider.on('accountsChanged', handleAccounts)
      library.provider.on('disconnect', handleDisconnect)
    }
    return () => {
      if (library && library.provider instanceof WalletConnectProvider) {
        library.provider.removeListener('chainChanged', handleChainChanged)
        library.provider.removeListener('accountsChanged', handleAccounts)
        library.provider.removeListener('disconnect', handleDisconnect)
      }
    }
  }, [active, error, activate, library])

  useEffect(() => {
    if (walletInfo.islogin && walletInfo.wallet === 'WalletConnect') {
      activate(walletconnect({ [walletInfo.network]: RPC_URLS[walletInfo.network] }, walletInfo.network), undefined, true)
        .then(() => {
          dispatch(SaveIsLogin(true))
          dispatch(SaveWallet('WalletConnect'))
          localStorage.setItem('wallet', 'WalletConnect')
          localStorage.setItem('isLogin', 'true')
        })
        .catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChainChanged = async (chainId: number | string) => {
    console.log('chainId', chainId)
  }

  const handleAccounts = async (accounts: string[]) => {
    console.log('accounts', accounts[0])
  }

  const handleDisconnect = async () => {}
}
