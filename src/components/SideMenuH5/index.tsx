import React, { memo, useState } from 'react'
import { SideMenuWrapper, StyledNavLink } from './styled'
import { Drawer, Row, Col, Collapse } from 'antd'
import LOGO from '@/assets/logo.png'
import Lottie from 'react-lottie'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { setListInfoSwitch } from '@/common/init'
import type { MenuListType as ListType } from '@/common/data.d'
import SwitchLanguage from '@/components/SwitchLanguage'
import { Link } from 'react-router-dom'

export default memo(function SideMenuH5Page() {
  const { i18n } = useTranslation()
  const [isMenuShow, setIsMenuShow] = useState(false)
  const [hover, setHover] = useState<boolean>(false)

  const [{ list, singleMen }] = useState<{ list: ListType[]; singleMen: boolean }>(() => {
    let { list, singleMen } = setListInfoSwitch()
    return { list, singleMen }
  })

  return (
    <SideMenuWrapper>
      {!isMenuShow && <MenuOutlined className="iconss" onClick={() => setIsMenuShow(true)} />}
      {isMenuShow && <CloseOutlined className="iconss" style={{ color: '#5f6469' }} onClick={() => setIsMenuShow(false)} />}
      <Drawer
        className="h5-drawer"
        closable={false}
        placement="top"
        height={'100%'}
        onClose={() => setIsMenuShow(false)}
        visible={isMenuShow}
      >
        <Row style={{ width: '100%', height: '5.5rem', display: 'flex', justifyContent: 'center', alignContent: 'center' }} gutter={20}>
          <Col span={12} lg={{ span: 6 }} className="tabbar-left">
            <div className="logo" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              <Link to="/home" onClick={() => setIsMenuShow(false)}>
                <Lottie
                  height="auto"
                  width="14.13rem"
                  options={{
                    loop: false,
                    autoplay: false,
                    animationData: LOGO,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  style={{ cursor: 'pointer' }}
                  isPaused={false}
                  isStopped={!hover}
                />
              </Link>
            </div>
          </Col>
          <Col span={12} lg={{ span: 6 }} className="tabbar-right">
            <CloseOutlined className="iconss" style={{ color: '#5f6469' }} onClick={() => setIsMenuShow(false)} />
          </Col>
        </Row>
        {!singleMen && (
          <Collapse defaultActiveKey={['1']} ghost accordion>
            {list.map((item, index) => {
              return (
                <Collapse.Panel key={item.key} header={<span>{i18n.language === 'en' ? item.enName : item.name}</span>}>
                  {index !== 3 && item.childList && (
                    <>
                      {item.childList.map((itemTwo, indexTwo) => (
                        <StyledNavLink to={itemTwo.url === '' ? {} : itemTwo.url} key={indexTwo} onClick={() => setIsMenuShow(false)}>
                          <div className="navlink-title">{i18n.language === 'en' ? itemTwo.enName : itemTwo.name}</div>
                          <div className="navlink-content">{i18n.language === 'en' ? itemTwo.enTitle : itemTwo.title}</div>
                        </StyledNavLink>
                      ))}
                    </>
                  )}
                  {index === 3 && item.childList && (
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                      {item.childList.map((itemTwo, indexTwo) => (
                        <StyledNavLink
                          onClick={() => setIsMenuShow(false)}
                          to={itemTwo.url === '' ? {} : itemTwo.url}
                          key={indexTwo}
                          style={{ width: '50%' }}
                        >
                          <div className="navlink-title">{i18n.language === 'en' ? itemTwo.enName : itemTwo.name}</div>
                          <div className="navlink-content">{i18n.language === 'en' ? itemTwo.enTitle : itemTwo.title}</div>
                        </StyledNavLink>
                      ))}
                    </div>
                  )}
                </Collapse.Panel>
              )
            })}
          </Collapse>
        )}
        {singleMen && (
          <div className="h5-menu-drawer-navlink">
            {list.map((item) => (
              <StyledNavLink
                singleMen={singleMen}
                to={item.url === '' ? {} : item.url}
                // isActive={(match, location) => oddEvent(match, location, item)}
              >
                <div className="navlink-child-title">{i18n.language === 'en' ? item.enName : item.name}</div>
              </StyledNavLink>
            ))}
          </div>
        )}

        <SwitchLanguage />
      </Drawer>
    </SideMenuWrapper>
  )
})
