import styled from 'styled-components'
import { Row } from 'antd'
import { NavLink } from 'react-router-dom'

export const TopBarWrapper = styled(Row)`
  width: 100%;
  height: 8.75rem;
  display: flex;
  align-items: center;
  .tabbar-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
