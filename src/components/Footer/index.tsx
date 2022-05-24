import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import { Row, Col, Image } from 'antd'
import LOGO from '@/assets/logo-footer.png'
import { Link } from 'react-router-dom'
import { FOOTER_1, FOOTER_2, FOOTER_3 } from './icon'
import { webLayoutAdaptation, h5LayoutAdaptation, webLayoutAdaptationMax } from '@/common/styled'

const FooterWrapper = styled.div`
  height: 17.88rem;
  position: relative;
  z-index: 3;
  ${webLayoutAdaptation}
  .ant-row {
    height: 17.88rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        ${h5LayoutAdaptation}
      `,
    )}
  @media(min-width: 1920px) {
    ${webLayoutAdaptationMax}
  }
`

const FooterIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  .footer-icons {
    margin-left: 1.88rem;
    width: 4.88rem;
    height: 4.88rem;
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        margin-top: 0;
      `,
    )}
`

export default memo(function FooterPages() {
  return (
    <FooterWrapper>
      <Row>
        <Col span={12} className="project-logo">
          <Link to="/home">
            <Image src={LOGO} preview={false} width="auto"></Image>
          </Link>
        </Col>
        <Col span={12}>
          <FooterIcon>
            <a href="https://twitter.com/TheHuobiNFT" target="_blank"><Image src={FOOTER_1} className="footer-icons" preview={false} /></a>
            {/* <a href="" target="_blank"><Image src={FOOTER_2} className="footer-icons" preview={false} /></a> */}
            <a href="https://discord.gg/8S6H6fgKk7" target="_blank"><Image src={FOOTER_3} className="footer-icons" preview={false} /></a>
          </FooterIcon>
        </Col>
      </Row>
    </FooterWrapper>
  )
})
