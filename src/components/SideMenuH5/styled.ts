import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const SideMenuWrapper = styled.div`
  .tabbar-right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
`

const activeClassName = 'ACTIVE'
export const StyledNavLink = styled(NavLink).attrs({ activeClassName })<{ singleMen?: boolean }>`
  color: #5f6469;
  min-height: 6.25rem;
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .navlink-content {
    font-size: 1rem;
    line-height: 1.75rem;
    padding: 0 1.63rem;
    color: #5f6469;
  }
  .navlink-title {
    font-size: 1rem;
    font-weight: bold;
    color: #293543;
    line-height: 1.5rem;
    padding: 0 1.63rem;
  }
  .navlink-child-title {
    font-size: 1rem;
    color: #293543;
    line-height: 1.75rem;
    padding: 0 1.63rem;
  }
  &.${activeClassName} {
    background: ${(props) => props.theme.themeColor}32;
    font-weight: ${(props) => (props.singleMen ? 600 : 400)};
    border-bottom: 0.13rem solid ${(props) => props.theme.themeColor};
  }
  &:hover {
    content: none;
    background: ${(props) => props.theme.themeColor}32;
    background: ${(props) => props.theme.themeColor}32;
  }
  &:after {
    border-bottom: 0.13rem solid ${(props) => props.theme.themeColor};
  }
`
