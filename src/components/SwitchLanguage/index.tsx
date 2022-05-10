import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { Image, message, Radio, Popover } from 'antd'
import { useTranslation } from 'react-i18next'
import EN_ICON from '@/assets/svg/en.svg'
import ZH_ICON from '@/assets/svg/zh.svg'
import { DownOutlined } from '@ant-design/icons'
import { AdaptFontSize } from '@/utils'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'

const SwitchLanguageWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  z-index: 10;
  .language-list-active {
    background-color: ${(props) => props.theme.themeColor}32;
  }
  ${({ theme }) => theme.mediaWidth.screenMd`margin-right: 10px;`}
`

const Language = styled.div``

const LanguageList = styled.div`
  line-height: 2.5rem;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: bold;
  color: #293543;
  transition: all 0.3s;
  :hover {
    background-color: ${(props) => props.theme.themeColor}32;
  }
`

const LanguageTitle = styled.div`
  min-width: 7.5rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: #5f6469;
  display: flex;
  align-items: flex-end;
  ${({ theme }) => theme.mediaWidth.screenLg`
    min-width: 5.63rem;
  `}
`

const SwitchH5 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  align-items: center;
`

export default memo(function SwitchLanguagePage() {
  const [move, setMoveSwitch] = useState(false)
  const { i18n, t } = useTranslation()
  const { windowSize } = useWindowSizeHooks()

  const languageChange = (str: 'en' | 'zh') => i18n.changeLanguage(str)

  const languageChangeSwitch = (str: 'en' | 'zh') => {
    languageChange(str)
    message.info({
      content: t('app.switch.language.tips', { msg: str === 'zh' ? '中文' : 'English' }),
      className: 'message-global',
    })
    setMoveSwitch(false)
  }

  const onChange = (str: any) => {
    let value = str.target.value
    languageChangeSwitch(value)
  }

  return (
    <>
      {windowSize.innerWidth > AdaptFontSize && (
        <SwitchLanguageWrapper className="SwitchLanguageWrapper">
          <Popover
            overlayClassName="languageOverlayClassName"
            visible={move}
            onVisibleChange={(visible) => setMoveSwitch(visible)}
            content={
              <Language>
                <LanguageList className={i18n.language === 'zh' ? 'language-list-active' : ''} onClick={() => languageChangeSwitch('zh')}>
                  中文
                </LanguageList>
                <LanguageList className={i18n.language === 'en' ? 'language-list-active' : ''} onClick={() => languageChangeSwitch('en')}>
                  English
                </LanguageList>
              </Language>
            }
            arrowPointAtCenter={true}
            getPopupContainer={() => (document as any).getElementsByClassName('SwitchLanguageWrapper')[0]}
          >
            <LanguageTitle>
              <Image src={i18n.language === 'zh' ? ZH_ICON : EN_ICON} width="1.25rem" height="1.25rem" preview={false} />
              <span style={{ margin: '0 0.38rem' }}>{i18n.language === 'zh' ? '中文' : 'English'}</span>
              <DownOutlined style={{ color: '#5F6469', lineHeight: '.88rem' }} />
            </LanguageTitle>
          </Popover>
        </SwitchLanguageWrapper>
      )}
      {windowSize.innerWidth <= AdaptFontSize && (
        <SwitchH5>
          <Radio.Group
            options={[
              { label: '中文', value: 'zh' },
              { label: 'English', value: 'en' },
            ]}
            onChange={onChange}
            value={i18n.language === 'zh' ? 'zh' : 'en'}
            optionType="button"
            buttonStyle="solid"
          />
        </SwitchH5>
      )}
    </>
  )
})
