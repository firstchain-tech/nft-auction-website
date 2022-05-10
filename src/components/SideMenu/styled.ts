import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const SideMenuWrapper = styled.div<{ active: boolean }>`
  display: flex;
  .fours {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    a {
      width: 50%;
      text-align: center;
    }
  }
`

const activeClassName = 'ACTIVE'
export const StyledNavLink = styled(NavLink).attrs({ activeClassName })<{ singleMen?: boolean }>`
  color: #5f6469;
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .navlink-content {
    font-size: 0.75rem;
    line-height: 1.5rem;
    padding: 0 1.63rem;
    color: #5f6469;
  }
  .navlink-title {
    font-size: 0.88rem;
    font-weight: bold;
    color: #293543;
    line-height: 1.5rem;
    padding: 0 1.63rem;
  }
  .navlink-child-title {
    font-size: 0.88rem;
    color: #293543;
    ${(props) =>
      !props.singleMen &&
      css`
        line-height: 1.5rem;
      `}
    padding: 0 1.63rem;
  }
  &.${activeClassName} {
    background: ${(props) => props.theme.themeColor}32;
    font-weight: ${(props) => (props.singleMen ? 600 : 400)};
    border-bottom: 0.13rem solid ${(props) => props.theme.themeColor};
  }
  &:hover {
    content: none;
    border-bottom: 0.13rem solid ${(props) => props.theme.themeColor};
    background: ${(props) => props.theme.themeColor}32;
  }
  &:after {
    border-bottom: 0.13rem solid ${(props) => props.theme.themeColor};
  }
`

export const SideMenuList = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media (max-width: 1400px) {
    justify-content: start;
  }
`

export const ListInfo = styled.div`
  font-size: 0.88rem;
  font-weight: 500;
  width: auto;
  margin-right: 1.88rem;
  color: #5f6469;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  .span {
    margin-right: 0.38rem;
    max-width: 90%;
    overflow: hidden;
    line-height: 0.88rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:nth-child(4) {
    margin-right: 0;
  }
  ${(props) =>
    props.theme.mediaWidth.screenXl(
      () => css`
        margin-right: 1.25rem;
      `,
    )}
  ${({ theme }) =>
    theme.mediaWidth.screenLg(
      () => css`
        width: calc(25% - 0.88rem);
        margin-right: 0.88rem;
      `,
    )}
`

export const MoveSideMenu = styled.div`
  .active-two {
    background: ${({ theme }) => theme.themeColor}32;
  }
`
