import * as actionTypes from './constants'

const initState: any = {
  network: localStorage.getItem('chainId') ? Number(localStorage.getItem('chainId')) : 1,
  islogin: localStorage.getItem('isLogin') ? true : false,
  wallet: localStorage.getItem('wallet') || 'NetWork',
}

export default function reducer(state = initState, action: any) {
  const { type } = action
  switch (type) {
    case actionTypes.SAVE_IS_LOGIN:
      return { ...state, islogin: action.islogin }
    case actionTypes.SAVE_NETWORK:
      return { ...state, network: action.network }
    case actionTypes.SAVE_WALLET:
      return { ...state, wallet: action.wallet }
    default:
      return state
  }
}
