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
  key: string
  tokenId: string
  amount: string
  collectibleHash: string
  collection: string
  currency: string
  finish: string
  opening: string
  seller: string
  blockNumber: string
  startTime: string
  endTime: string
  totalPrice: string
  numberKey: string
}

/** numberKey -》 blocakNumbr+Tokenid+acount */

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
  collectibleHash: string
  bidder: string
  price: string
  finish: string
  blockNumber: string
  index: number
}

export interface ArrRequestType {
  address: string
  apiKey: string
  apiUrl: string
  topic0: any
  eventNme: string
}

export interface RoadmapListType {
  name: string
  amount: string
  unit: string
  content: string[]
}
