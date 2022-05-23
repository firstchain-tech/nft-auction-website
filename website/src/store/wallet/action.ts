import * as actionTypes from './constants'

export const SaveIsLogin = (res: boolean) => ({
  type: actionTypes.SAVE_IS_LOGIN,
  islogin: res,
})

export const SaveNetwork = (res: any) => ({
  type: actionTypes.SAVE_NETWORK,
  network: res,
})

export const SaveWallet = (res: string) => ({
  type: actionTypes.SAVE_WALLET,
  wallet: res,
})
