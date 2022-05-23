import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export type Color = string
export interface Colors {
  white: Color
  black: Color
  bgColor1: Color
  bgColor2: Color
  themeColor: Color
  line: Color
  black2: Color
}
declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    mediaWidth: {
      screenXs: ThemedCssFunction<DefaultTheme>
      screenSm: ThemedCssFunction<DefaultTheme>
      screenMd: ThemedCssFunction<DefaultTheme>
      screenLg: ThemedCssFunction<DefaultTheme>
      screenXl: ThemedCssFunction<DefaultTheme>
      screebXll: ThemedCssFunction<DefaultTheme>
    }

    height: number
  }
}
