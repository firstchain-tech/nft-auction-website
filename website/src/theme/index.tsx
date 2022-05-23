import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { css, DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { Colors } from './styled'

const MEDIA_WIDTHS = {
  screenXs: 479,
  screenSm: 575,
  screenMd: 767,
  screenLg: 991,
  screenXl: 1199,
  screebXll: 1599,
}

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {}) as any

const white = '#FFFFFF'
const black = '#000000'
const themeColor = '#5927EF'
export function colors(darkMode: boolean): Colors {
  return {
    white,
    black,
    black2: darkMode ? '#333333' : '#333333',
    themeColor: darkMode ? themeColor : themeColor,
    bgColor1: darkMode ? '#151231' : '#151231',
    bgColor2: darkMode ? '#EAEFFE' : '#EAEFFE',
    line: darkMode ? '#C8C8D9' : '#C8C8D9',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    mediaWidth: mediaWidthTemplates,

    height: document.documentElement.clientHeight || document.body.clientHeight,
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }, props: any) {
  const thmemBoolean = useSelector((state: any) => state.themeInfo.themeBoolean)

  const darkMode = thmemBoolean

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}
