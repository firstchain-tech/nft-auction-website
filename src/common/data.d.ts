export interface MenuListType {
  name: string
  enName: string
  url: string
  key: string
  index: number
  childList?: {
    name: string
    enName: string
    url: string
    title: string
    enTitle: string
    childList?: {
      name: string
      enName: string
      url: string
      title?: string
      enTitle?: string
    }[]
  }[]
}

export interface AuctionListType {
  iamge: string
  name: string
  price: string
  startTime: string
  endTime: string
  edition: string
  key: string
}

export interface RewardListType {
  iamge: string
  name: string
}

export interface OffersListType {
  key: string
  price: string
  floorDifference: string
  isHight: boolean
  expiration: string
  from: string
}
