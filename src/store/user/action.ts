import * as actionTypes from './constants'

export const SetUser = (res: string) => ({
  type: actionTypes.SAVE_USER,
  user: res,
})

export const SaveAddress = (res: string) => ({
  type: actionTypes.SAVE_ADDRESS,
  address: res,
})
