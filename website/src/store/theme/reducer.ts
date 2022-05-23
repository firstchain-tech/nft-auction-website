const initState = {
  themeBoolean: false,
}

function reducer(state = initState, action: any) {
  const { type } = action

  switch (type) {
    case 'setTheme':
      return { ...state, themeBoolean: !state.themeBoolean }
    default:
      return state
  }
}
export default reducer
