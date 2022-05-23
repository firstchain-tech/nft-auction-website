import { useEffect } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import { Web3Provider } from '@ethersproject/providers'
import type { ConstantInitTypes } from '@/contracts/constantInit'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { SaveNetwork } from '@/store/wallet/action'

/** Dynamically listen for Metamask changes */
export const useChainIdHooks = () => {
  const context = useWeb3React<Web3Provider>()
  const { chainId } = context
  const dispatch = useDispatch()

  const dataInit: ConstantInitTypes = useDataHooks()
  const { web3 } = dataInit

  useEffect(() => {
    if (chainId) {
      dispatch(SaveNetwork(chainId))
      localStorage.setItem('chainId', chainId.toString())
    } else {
      noChainIdSwitch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  useEffect(() => {
    const chainIdTimer = setInterval(() => {
      // @ts-ignore
      const ethereum = window && window.ethereum
      // 当用户切换网络时，MetaMask扩展会自动刷新,允许关闭 默认的网络切换自动刷新功能。
      if (ethereum) {
        ethereum.autoRefreshOnNetworkChange = false
        ethereum.on &&
          ethereum.on('networkChanged', function () {
            window.location.reload()
          })
        if (chainId) clearInterval(chainIdTimer)
      } else {
        noChainIdSwitch()
        clearInterval(chainIdTimer)
      }
    }, 300)
    if (chainId) clearInterval(chainIdTimer)
    return () => clearInterval(chainIdTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  const noChainIdSwitch = () => {
    // @ts-ignore
    const { ethereum } = window
    if (ethereum && ethereum.isMetaMask && ethereum.chainId) {
      let currentChainId = web3.utils.hexToNumber(ethereum.chainId)
      dispatch(SaveNetwork(currentChainId))
      localStorage.setItem('chainId', currentChainId.toString())
    } else {
    }
  }
}
