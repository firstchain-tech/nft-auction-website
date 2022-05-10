import React, { memo, useEffect, useState, createContext } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { ConstantInit } from '@/contracts/constantInit'
import { getActiveChainId } from '@/contracts/constant'
import { useSelector, useDispatch } from 'react-redux'
import { SetActivaing } from '@/store/connector/action'
import { useEagerConnect, useInactiveListener, useWalletConnectListener } from '@/hooks/useWeb3Hooks'
import { RPC_URLS, defaultChainId } from '@/contracts/constant'
import HooksProvider from '@/components/HooksProvider'

export default memo(({ children }: any) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderPage children={children} />
  </Web3ReactProvider>
))

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export interface DataContext {
  data?: typeof ConstantInit
  blockNumber: number | undefined
}

export const Context = createContext<DataContext>({
  data: undefined,
  blockNumber: undefined,
})

const Web3ProviderPage = ({ children }: any) => {
  const dispatch = useDispatch()
  const context = useWeb3React<Web3Provider>()
  const { connector, library, chainId } = context

  const walletInfo = useSelector((state: any) => state.walletInfo)
  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined)
  const activatingConnector = useSelector((state: any) => state.connectorInfo.activating)

  const [data, setData] = useState<any>(() => {
    let isTrue = getActiveChainId(RPC_URLS, walletInfo.network)
    return new ConstantInit(
      library || RPC_URLS[!isTrue ? defaultChainId : walletInfo.network],
      !isTrue ? defaultChainId : walletInfo.network,
    )
  })

  // @ts-ignore
  window.data = data

  useEffect(() => {
    if (library) {
      let isTrue = getActiveChainId(RPC_URLS, walletInfo.network)
      let libraryInit = new ConstantInit(library.provider, !isTrue ? defaultChainId : walletInfo.network)
      setData(libraryInit)
    } else {
      let isTrue = getActiveChainId(RPC_URLS, walletInfo.network)
      let libraryInit = new ConstantInit(
        RPC_URLS[!isTrue ? defaultChainId : walletInfo.network],
        !isTrue ? defaultChainId : walletInfo.network,
      )
      setData(libraryInit)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, walletInfo.network])

  useEffect((): any => {
    if (!!library) {
      let stale = false
      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(undefined)
          }
        })
      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber)
      }
      library.on('block', updateBlockNumber)
      return () => {
        stale = true
        library.removeListener('block', updateBlockNumber)
        setBlockNumber(undefined)
      }
    }
  }, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      dispatch(SetActivaing(undefined))
    }
  }, [activatingConnector, connector, dispatch])
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

  useWalletConnectListener()

  return (
    <Context.Provider value={{ data, blockNumber }}>
      <HooksProvider>{children}</HooksProvider>
    </Context.Provider>
  )
}
