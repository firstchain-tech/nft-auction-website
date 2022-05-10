import React, { memo, useState } from 'react'
import { SideMenuWrapper, StyledNavLink, SideMenuList, ListInfo, MoveSideMenu } from './styled'
import { Row, Col, Popover, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { setListInfoSwitch } from '@/common/init'
import type { MenuListType as ListType } from '@/common/data.d'

export default memo(function SideMenuPages() {
  const { i18n } = useTranslation()
  const [{ list, singleMen }] = useState<{ list: ListType[]; singleMen: boolean }>(() => {
    let { list, singleMen } = setListInfoSwitch()
    return { list, singleMen }
  })

  const [moveTwoChildActive, setMoveTwoChildActive] = useState<number>(0)
  const [move, setMoveSwitch] = useState<boolean[]>([false, false, false, false])

  const oddEvent = (match: any, location: any, item: any) => {
    if (!match || item.url === '') {
      return false
    }
    const hash = location.hash
    const itemHash = `#${item.url.substring(item.url.lastIndexOf('#') + 1, item.url.length)}`
    if (hash === itemHash) return true
    else return false
  }

  const popoverContent = (item: ListType) => (
    <>
      {item.key !== '2' && item.childList && (
        <MoveSideMenu className={item.key === '4' ? 'fours' : ''}>
          {item.childList.map((itemTwo, indexTwo) => (
            <StyledNavLink
              to={itemTwo.url === '' ? {} : itemTwo.url}
              key={indexTwo}
              onClick={() => setMoveSwitch([false, false, false, false])}
            >
              <div className="navlink-title">{i18n.language === 'en' ? itemTwo.enName : itemTwo.name}</div>
              <div className="navlink-content">{i18n.language === 'en' ? itemTwo.enTitle : itemTwo.title}</div>
            </StyledNavLink>
          ))}
        </MoveSideMenu>
      )}
      {item.key === '2' && item.childList && (
        <MoveSideMenu>
          <Row>
            <Col span={16}>
              {item.childList.map((itemTwo, indexTwo) => (
                <StyledNavLink
                  key={indexTwo}
                  to={itemTwo.url === '' ? {} : itemTwo.url}
                  className={indexTwo === moveTwoChildActive ? 'active-two' : ''}
                  onMouseEnter={() => setMoveTwoChildActive(indexTwo)}
                  onClick={() => setMoveSwitch([false, false, false, false])}
                >
                  <div className="navlink-title">{i18n.language === 'en' ? itemTwo.enName : itemTwo.name}</div>
                  <div className="navlink-content">{i18n.language === 'en' ? itemTwo.enTitle : itemTwo.title}</div>
                </StyledNavLink>
              ))}
            </Col>
            <Col span={8} className="rights">
              <div className="navlink-titles">
                {i18n.language === 'en' ? item.childList[moveTwoChildActive].enName : item.childList[moveTwoChildActive].name}
              </div>
              {item.childList[moveTwoChildActive].childList?.map((ite, i) => (
                <StyledNavLink
                  to={ite.url === '' ? {} : ite.url}
                  key={i}
                  isActive={(match, location) => oddEvent(match, location, ite)}
                  onClick={() => setMoveSwitch([false, false, false, false])}
                >
                  <div className="navlink-child-title">{i18n.language === 'en' ? ite.enName : ite.name}</div>
                </StyledNavLink>
              ))}
            </Col>
          </Row>
        </MoveSideMenu>
      )}
    </>
  )

  return (
    <>
      {!singleMen && (
        <SideMenuWrapper active={i18n.language === 'zh'} className="SideMenuWrapper">
          <SideMenuList>
            {list.map((item) => (
              <Popover
                content={popoverContent(item)}
                key={item.key}
                arrowPointAtCenter={true}
                visible={move[item.index]}
                onVisibleChange={(visible) =>
                  setMoveSwitch(() => {
                    let obj: boolean[] = [false, false, false, false]
                    obj[item.index] = visible
                    return obj
                  })
                }
                overlayClassName={item.key !== '2' ? 'overlayClassName' : 'overlayClassNameTwo'}
                getPopupContainer={() => (document as any).getElementsByClassName('SideMenuWrapper')[0]}
              >
                <ListInfo>
                  <div className="span">{i18n.language === 'en' ? item.enName : item.name}</div>
                  <DownOutlined style={{ color: '#5F6469' }} />
                </ListInfo>
              </Popover>
            ))}
          </SideMenuList>
        </SideMenuWrapper>
      )}

      {singleMen && (
        <Menu mode="horizontal" style={styleMenu}>
          {list.map((item) => (
            <Menu.Item key={item.key} className="menuItemCus">
              <StyledNavLink
                singleMen={singleMen}
                to={item.url === '' ? {} : item.url}
                // isActive={(match, location) => oddEvent(match, location, item)}
              >
                <div className="navlink-child-title">{i18n.language === 'en' ? item.enName : item.name}</div>
              </StyledNavLink>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </>
  )
})

const styleMenu = {
  width: '100%',
  background: 'transparent',
  borderBottom: 'none',
}
