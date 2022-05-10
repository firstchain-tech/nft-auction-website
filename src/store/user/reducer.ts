import * as actionTypes from './constants'

const initState = {
  user: {},
  address: '',
}

export default function reducer(state = initState, action: any) {
  const { type } = action
  switch (type) {
    case actionTypes.SAVE_USER:
      return { ...state, user: action.user }
    case actionTypes.SAVE_ADDRESS:
      return { ...state, address: action.address }
    default:
      return state
  }
}
