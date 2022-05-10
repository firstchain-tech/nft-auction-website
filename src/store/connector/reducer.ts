import * as actionTypes from './constants'

const initState = {
  activating: undefined,
}

export default function reducer(state = initState, action: any) {
  const { type } = action
  switch (type) {
    case actionTypes.SAVE_ACTIVAING:
      return { ...state, activating: action.activating }
    default:
      return state
  }
}
