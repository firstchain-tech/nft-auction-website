import React, { memo, useEffect, useState } from 'react'
import {
  ConnectWalletWrapper,
  ModalTitle,
  WalletTitleAddress,
  DrawerTitle,
  WalletInitDiv,
  NoChainIdTips,
  WalletLoginOutModal,
  WalletLoginOutMask,
  NoCopyTips,
} from './styled'
import { Button, Image, Row, Col, message, Drawer, Spin } from 'antd'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useDispatch, useSelector } from 'react-redux'
import { SetActivaing } from '@/store/connector/action'
// netWorkInit
import { connectorsByName, defaultChainId, getActiveChainId, RPC_URLS } from '@/contracts/constant'
import { useTranslation } from 'react-i18next'
// formatStrAddress,
import { Adapth5 } from '@/utils'
import { netWorks } from '@/contracts/constant'
// SaveNetwork
import { SaveIsLogin, SaveWallet } from '@/store/wallet/action'
import { walletInit } from '@/contracts/init'
import { getErrorMessage } from '@/hooks/useErrorHooks'
import { SaveAddress } from '@/store/user/action'
import { CloseOutlined, CopyOutlined } from '@ant-design/icons'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import TopBar from '@/components/TopBar'

const HeadingBase =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAGcklEQVRoQ92beagVVRzHvRlBmK220GKvxSwtqNR8ZkUrlQRiBSZhCVYYlRlholFIobYQpRnSIlgmImThP1poGi1oixW02kK3laLF6hVRVLfP973f3M6bN/fOnTPn3neZA1/mvpkz39/vO3PO75zzO/NKA5pQKpXKbtB2GoZzFA4Bgw2y2mX4muMOwzaO20ql0l+h3SqFIkScRFwCJoPx4APwMvjQRHzhiJPZSPRQexDHcjwNHAdeAWvAWkTrgeQuuYUi8Bi8mAMuBi+AVWAjDv7i4x18e3HfeeBycCZ4GtwN30c+fNE93kJxqAOSReBssBQsw5kf8jgTvxcbQzh3LbgebAZzsVH2sZFZqPW/2RibBR4AizH+m4/xRu/B5h7UvdGxeW/WfpxJKAaPxpj6zldgJsY+b9TZEPWwfzg8S8ChYDL2P2mUt2GhGFEfXAbmY0DHfiv4ouY8X80aX9SHU0tDQiG+DiYFnIkQv5XK2oIK+HQSZtYBBaqH0kymCoXwNkgUAc9vdVNNc96a8nPUW4Vvd9arX1eovckbIDgdou/TDPfHdXzcH7svgQfrvdmaQq1PKqpKZEuDTtYHZm9WYmfV6rOJQi26anZyQbv0yTTx1mefpd74pGjcR6iNk1u54bH+jq5p4uLXLRpfxflx8XE2SeitVDyFihOzGmqH+ohVJH4N/xe4/vQSatO616kwut37Za2Hav31Da6PcaeLcaGrqfAOFRaGfDu2stFYfCnQIqACPgZPgaWhp5DYmwfvCfBOiXRUhdoqRJHrqJCG4R0D5zNA69GkovWoJiLbQz1cmxt/Cp9GjO5Vjyt0OX+X0wbeLM7Yw3uVe/YGCnB3AEVzFa1ZbwfjwK9gVJa5a5ofNtHpgHN6Vag1LS2Mh3Eh2FIL3o1wngvURKfA/bfrINd35W91FzXp57muukGKLfHUPYbC29X9Rjk5jYOaz6QgVno4lT5RdmEnOBLun5O4qaeFdhnorY+gnjITQQrc6jLr4FwRCd3AieWc0JMPUjByNUSPgJXwXlGPlLpPcH0quIa6jwZxoOdhq6VMh/PCkk0Q1FwP44RX+qPGm5rLeUXvRfAqCtYs+KB6qj+HuvcEFKrW8iUYIqFn8EMr9rGhDIgHXs1Q9HaehFtvq57QFVy8Esyg7sOB/VAwnC2ht/DjQAzcHNiAxkulMdP66H7UUdDYB4zEj/cD+3EffN9JqIYV5VKD9Y3I0VjUvQwb/7girNus5dxFYDPXzwkp0lqWYkWnhCr3Og8jLzbBiN6qktJ6WxpHtTjWOKqZkcbPu4AyBYrIY6PBPaQf1jUXSuhnEJ+FkXJIA85b1cxI0VyJ6qSimdEk7GuOHbzY/H2LhCriDsfQj8GtGKGNlTP4Uwm2EXZaUzM1W2UGgmTjk/zHtmLADgn9kx+DMRZ8v6NZDy4Lr8WBrpYKxeggnFR/VdnJw/09i9M+dV2hTWm6GBiIYwo4mr9q82gkOCjm7Lf8/R5QQNwEtsYjs4849x636QYNRhAri64EsyYA8aXZH5z7yRzZl+PuMSEKTI8D7eNoNyB3cYNRkOHFmqXSMNqTiQRoIrAeaIPobZzXCqlauEeR+ESgjaoJYJhd1ANRBnJB3ubtDi+5JwyQHWGCtMepMVL7M8ocRGvPht4MPKdSUXlk7bFqwaHVzwR41Oq8ii0uuicMuaaA1geUo+kAWmJNxbFc2QI4R8GzEmhTuAyUw/Ia/uCqTgFzTeohWowjM8GbQBMPZQtyF3j3hGQLOBksgVfbhpkLPNVJvb438F6mQaQAcjDoxBmRBitwa0WlKeQ3cNfKOdW0ZxOVnmWaanHCe+HNvf9CIZ6BOKPfwQrcu0CmhUAFbv3OVLj//4W3CZ3G0SuVApmCzwAcSd2Zy+SlVc7Dz719Uin6QsQrORY54iMiyz1ZHyR+6fuH3skxe6te6U4IFXEVJZtZtiN0dBYD+KV93d7pThOqtWPwBHYW50LVRaQ+7khOYJtY5Vjf5en12qAJ5UCreBCqGdrx6Oi7JWFCOzgWf5PJxBZ/29CEagJR/I1gE6sPp4q9tR8FDDq08jvF/ljDEavN23b//OYAfFSq1u/zG0ds8T+oir3ZYn8iF+uzxf7o0RFb/M9YHbEaZ6MPk+/nt1b/rfgwWVmMm2wkaO6Hye5c1dKIxf3UPD4xR3Cx/3kgQXCx/x0kaenFW267f/D5D6+EJvbEo6UFAAAAAElFTkSuQmCC'

export default memo(function ConnectWalletPage(props) {
  // @ts-ignore
  const { ethereum } = window
  const { REACT_APP_ENV = 'prd' } = process.env

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [onShow, setOnShow] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isLogoutShow, setIsLogoutShow] = useState<boolean>(false)

  const context = useWeb3React<Web3Provider>()
  const { activate, active, error, library, deactivate, account } = context

  const walletInfo = useSelector((state: any) => state.walletInfo)
  const myAddress = useSelector((state: any) => state.userInfo.address)

  const [isNetWork, setIsNetWork] = useState<boolean>(() => getActiveChainId(RPC_URLS, walletInfo.network))
  const { windowSize } = useWindowSizeHooks()

  useEffect(() => {
    setIsNetWork(getActiveChainId(RPC_URLS, walletInfo.network))
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletInfo.network])

  useEffect(() => {
    setLoading(false)
    if (active) setOnShow(false)
    if (!active) {
      dispatch(SaveIsLogin(false))
      dispatch(SaveWallet('NetWork'))
      dispatch(SaveAddress(''))
      localStorage.removeItem('isLogin')
      localStorage.removeItem('wallet')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, error, library])

  useEffect(() => {
    if (account) dispatch(SaveAddress(account))
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const onConnect = async ({ src }: any) => {
    const currentConnector = connectorsByName[src]
    setIsLogoutShow(false)
    if (src === 'Injected') {
      dispatch(SetActivaing(currentConnector))
      setInjectedNetWorks(walletInfo.network)
      return false
    } else if (src === 'WalletConnect') {
      activate(
        connectorsByName['WalletConnect']({ [walletInfo.network]: RPC_URLS[walletInfo.network] }, walletInfo.network),
        undefined,
        true,
      )
        .then(() => {
          setLoading(false)
          dispatch(SaveIsLogin(true))
          dispatch(SaveWallet(src))
          localStorage.setItem('wallet', src)
          localStorage.setItem('isLogin', 'true')
          message.success({
            content: t('app.link.suceess'),
            className: 'message-global',
          })
        })
        .catch(async (error) => {
          let msg = getErrorMessage(error)
          await deactivate()
          message.error({
            content: msg,
            className: 'message-global',
          })
          setLoading(false)
          connectorsByName[src].walletConnectProvider = undefined
        })
    } else {
      activate(connectorsByName[src], undefined, true)
        .then(() => {
          setLoading(false)
          dispatch(SaveIsLogin(true))
          dispatch(SaveWallet(src))
          localStorage.setItem('wallet', src)
          localStorage.setItem('isLogin', 'true')
          message.success({
            content: t('app.link.suceess'),
            className: 'message-global',
          })
        })
        .catch(async (error) => {
          let msg = getErrorMessage(error)
          await deactivate()
          message.error({
            content: msg,
            className: 'message-global',
          })
          setLoading(false)
          if (src === 'WalletConnect') connectorsByName[src].walletConnectProvider = undefined
        })
    }
  }

  const setInjectedNetWorks = (objChainId: string | number) =>
    changeInjectedNetwork(objChainId)
      .then(async () => await activeInjectedChange())
      .catch((error) => {
        console.log('msg', error.message)
        message.error({
          content: error.message,
          className: 'message-global',
        })
        setLoading(false)
      })

  const changeInjectedNetwork = (objChainId: any) =>
    new Promise(async (resolve: any, reject) => {
      // @ts-ignore
      const { ethereum } = window
      let obj: any = isNetWork ? netWorks[objChainId] : netWorks[defaultChainId]
      if (ethereum && ethereum.isMetaMask && obj) {
        if (obj.isSwitch)
          ethereum
            .request({ method: 'wallet_switchEthereumChain', params: [{ chainId: obj.chainId }] })
            .then(() => setTimeout(resolve, 500))
            .catch((err: any) => reject(err))
        else
          ethereum
            .request({ method: 'wallet_switchEthereumChain', params: [{ chainId: obj.chainId }] })
            .then(() => setTimeout(resolve, 500))
            .catch((switchError: any) => {
              if (switchError.code === 4902)
                ethereum
                  .request({ method: 'wallet_addEthereumChain', params: [netWorks[objChainId]] })
                  .then(() => setTimeout(resolve, 500))
                  .catch((err: any) => reject(err))
              else reject(switchError)
            })
      } else resolve()
    })

  const activeInjectedChange = async () => {
    activate(connectorsByName['Injected'], undefined, true)
      .then(() => {
        dispatch(SaveIsLogin(true))
        dispatch(SaveWallet('Injected'))
        setLoading(false)
        localStorage.setItem('wallet', 'Injected')
        localStorage.setItem('isLogin', 'true')
        message.success({
          content: t('app.link.suceess'),
          className: 'message-global',
        })
      })
      .catch(async (error) => {
        let msg = getErrorMessage(error)
        await deactivate()
        setLoading(false)
        message.error({
          content: msg,
          className: 'message-global',
        })
      })
  }

  /** choose Wallet */
  const switchWalletConnect = async (src: any) => {
    onConnect({ src })
    setLoading(true)
  }

  // const switchNetWork = (str: any) => {
  //   localStorage.setItem('chainId', str)
  //   dispatch(SaveNetwork(str))
  // }

  const loginOut = async () => {
    await deactivate()
    dispatch(SaveIsLogin(false))
    dispatch(SaveAddress(''))
    dispatch(SaveWallet('NetWork'))
    localStorage.removeItem('isLogin')
    localStorage.removeItem('wallet')
    message.info({
      content: t('app.link.disconnect'),
      className: 'message-global',
    })
    // history.replace('/home')
  }

  const switchNetWorkChange = () =>
    ethereum
      .request({ method: 'wallet_switchEthereumChain', params: [{ chainId: netWorks[defaultChainId].chainId }] })
      .then(() => {})
      .catch((err: any) => {})

  const copy = () => {
    let aux = document.createElement('input')
    aux.setAttribute('value', window.location.host)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
    message.success({
      content: t('app.copy.success'),
      className: 'message-global',
    })
  }

  return (
    <ConnectWalletWrapper className="connect-wallet">
      {active && myAddress && (
        <>
          <WalletTitleAddress
            onClick={() => setIsLogoutShow(true)}
            onMouseEnter={() => setIsLogoutShow(true)}
            onMouseLeave={() => setIsLogoutShow(false)}
          >
            <Image src={HeadingBase} preview={false}></Image>
            {/* <span style={{ marginLeft: '0.75rem' }}>{formatStrAddress(6, 4, myAddress)}</span> */}
            <div style={{ display: isLogoutShow ? 'block' : 'none' }}>
              <WalletLoginOutModal onClick={() => loginOut()}>{t('app.link.logout')}</WalletLoginOutModal>
            </div>
          </WalletTitleAddress>
          <WalletLoginOutMask style={{ display: isLogoutShow ? 'block' : 'none' }}></WalletLoginOutMask>
        </>
      )}
      {!active && (
        <Button
          size="large"
          type="primary"
          className="wallet-login-btn"
          onClick={() => {
            if (!ethereum && windowSize.innerWidth < Adapth5) {
              copy()
              return false
            }
            setOnShow(true)
          }}
        >
          {t('app.link.btn')}
        </Button>
      )}
      <Drawer
        key="wallet-drawer"
        placement={windowSize.innerWidth >= Adapth5 ? 'right' : 'top'}
        onClose={() => setOnShow(false)}
        visible={onShow}
        className={windowSize.innerWidth >= Adapth5 ? 'drawer-mask-wallet' : 'drawer-mask-wallet-h5'}
        height="38rem"
        width="26.25rem"
        closable={false}
      >
        <Spin tip="Loading..." spinning={loading}>
          <Row>
            {windowSize.innerWidth < Adapth5 && (
              <div style={{ padding: '0 2.5rem 0', background: 'rgb(21, 18, 49)', width: '100%' }}>
                <TopBar isH5={true} />
              </div>
            )}
            <Col span={24} className="drawer-wallet-title drawer-wallet-h5">
              <DrawerTitle>{t('app.link.modal.title')}</DrawerTitle>
              <CloseOutlined style={{ color: '#0000003c', fontSize: '1.5rem' }} onClick={() => setOnShow(false)} />
            </Col>
            <Col span={24} className="drawer-wallet-h5">
              <ModalTitle>{t('app.link.modal.ftitle')}</ModalTitle>
              <WalletInitDiv>
                {walletInit
                  .filter((item) => {
                    if (!ethereum) return item.name !== 'Metamask'
                    return true
                  })
                  .map((item, index) => (
                    <Col span={24} key={index} onClick={() => switchWalletConnect(item.link)}>
                      <Image width="2.75rem" height="auto" src={item.icon} preview={false} />
                      <span className="choose-span">{item.name}</span>
                    </Col>
                  ))}
              </WalletInitDiv>
            </Col>
          </Row>
        </Spin>
      </Drawer>
      {!isNetWork && !active && ethereum && ethereum.isMetaMask && REACT_APP_ENV !== 'dev' && (
        <NoChainIdTips onClick={() => switchNetWorkChange()}>
          <span>{t('app.no.chainid.tips')}</span>
          <Button className="no-network-btns">{t('app.no.chainid.btn')}</Button>
        </NoChainIdTips>
      )}
      {!ethereum && windowSize.innerWidth < Adapth5 && (
        <NoCopyTips>
          <span className="tips">{t('app.copy.tips')}</span>
          <Button icon={<CopyOutlined />} type="primary" onClick={() => copy()}>
            {t('app.copy.btn')}
          </Button>
        </NoCopyTips>
      )}
    </ConnectWalletWrapper>
  )
})
