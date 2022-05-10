import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import { Row, Col, Image } from 'antd'
import LOGO from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import { FOOTER_1, FOOTER_2, FOOTER_3 } from './icon'

const FooterWrapper = styled(Row)`
  height: 17.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FooterIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  .footer-icons {
    margin-left: 1.56rem;
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
      <Col span={12} className="project-logo">
        <Link to="/home">
          <Image src={LOGO} preview={false} width="auto"></Image>
        </Link>
      </Col>
      <Col span={12}>
        <FooterIcon>
          <Image src={FOOTER_1} className="footer-icons" preview={false} />
          <Image src={FOOTER_2} className="footer-icons" preview={false} />
          <Image src={FOOTER_3} className="footer-icons" preview={false} />
        </FooterIcon>
      </Col>
    </FooterWrapper>
  )
})
