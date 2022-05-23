import styled, { css } from 'styled-components'
import { Row } from 'antd'
import { NavLink } from 'react-router-dom'
import { webLayoutAdaptation, h5LayoutAdaptation, webLayoutAdaptationMax } from '@/common/styled'

export const TopBarWrapper = styled(Row)`
  ${webLayoutAdaptation}
  height: 8.75rem;
  display: flex;
  align-items: center;
  .tabbar-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

const activeClassName = 'ACTIVE'
export const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #363639;
    font-weight: 600;
    .navlink-child-title {
      color: #363639;
      font-weight: 600;
    }
    .reward-drop-btn,
    .reward-drop-btn-h5 {
      color: ${(props) => props.theme.white};
      border-color: ${(props) => props.theme.white};
      background: rgba(255, 255, 255, 0.2);
    }
  }
`
