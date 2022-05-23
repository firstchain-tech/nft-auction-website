const getWeb3StorageList = () => {
  let localLength = localStorage.getItem('item_acution_number') || '0'
  let localWeb3StorageList = []
  for (let i = 0; i < Number(localLength); i++) {
    let obj: any = localStorage.getItem(`item_acution_number_${i}`) || JSON.stringify([])
    let listObj = JSON.parse(obj)
    localWeb3StorageList.push(...listObj)
  }
  return localWeb3StorageList
}

const initState = {
  localList: getWeb3StorageList() as any,
}

function reducer(state = initState, action: any) {
  const { type } = action

  switch (type) {
    case 'setWeb3Storage':
      return { ...state, localList: action.localList }
    default:
      return state
  }
}
export default reducer
