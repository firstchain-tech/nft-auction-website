import { combineReducers } from 'redux'
import { reducer as themeReducer } from './theme'
import { reducer as userReducer } from './user'
import { reducer as connectorReducer } from './connector'
import { reducer as walletReducer } from './wallet'
import { reducer as infoReducer } from './info'

/**
 * theme 主题 styled-components
 * userInfo 登录用户信息、用户地址
 * connector 链接Metamask同步信息功能
 * wallet 当前选择而的network、wallet、是否链接（主要针对于Metamask、让用户有退出的感觉）
 */

const reducer = combineReducers({
  themeInfo: themeReducer,
  userInfo: userReducer,
  connectorInfo: connectorReducer,
  walletInfo: walletReducer,
  infoInfo: infoReducer,
})

export default reducer
