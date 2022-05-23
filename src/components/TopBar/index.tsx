import React, { memo } from 'react'
import { TopBarWrapper, StyledNavLink } from './styled'
import { Col, Image, Button } from 'antd'
import LOGO from '@/assets/logo.png'
import ConnectWallet from '@/components/ConnectWallet'
import { AdaptFontSize } from '@/utils'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { useTranslation } from 'react-i18next'
import { GiftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

interface Type {
  isH5?: boolean
}

export default memo(function TopBarPages(params: Type) {
  const { isH5 = false } = params
  const { windowSize } = useWindowSizeHooks()
  const { t } = useTranslation()

  const oddEvent = (match: any, location: any) => {
    if (!match) {
      return false
    }
    const hash = location.hash
    if (hash === '#reward') return true
    else return false
  }

  return (
    <TopBarWrapper>
      <Col span={12} className="project-logo">
        <Link to="/home">
          <Image src={LOGO} preview={false} width="auto"></Image>
        </Link>
      </Col>
      <Col span={12} className="tabbar-right">
        <StyledNavLink to="/home#reward" isActive={oddEvent}>
          <Button
            ghost
            shape={windowSize.innerWidth >= AdaptFontSize ? 'default' : 'circle'}
            className={windowSize.innerWidth >= AdaptFontSize ? 'reward-drop-btn' : 'reward-drop-btn-h5'}
            icon={<GiftOutlined />}
          >
            {windowSize.innerWidth >= AdaptFontSize ? t('home.reward.topbar.btn') : ''}
          </Button>
        </StyledNavLink>

        {!isH5 && <ConnectWallet status="topbar" />}
      </Col>
    </TopBarWrapper>
  )
})
