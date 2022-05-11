import type { AuctionListType, RewardListType } from '@/common/data.d'
import { useEffect, useState } from 'react'
import AUCTION_DEFAULT_IMAGE from '@/assets/auction-default.png'
import REWARD_DEFAULT_IMAGE from '@/assets/reward-default.png'

export const useHomeHooks = () => {
  const [auctionList, setAuctionList] = useState<AuctionListType[]>([])
  const [rewardList, setRewardList] = useState<RewardListType[]>([])
  const [isAuction] = useState<boolean>(false)
  const [isAuctionSuccess] = useState<boolean>(false)

  useEffect(() => {
    getAuctionList()
    getRewardList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAuctionList = async () => {
    try {
      let list: AuctionListType[] = []
      for (let i = 0; i < 1; i++) {
        list.push({
          iamge: AUCTION_DEFAULT_IMAGE,
          name: 'McGrady Moment',
          price: '3500000000000000000000',
          edition: '1',
          startTime: '2022/05/25 10:00:00',
          endTime: '2022/05/26 21:00:00',
          key: i.toString(),
        })
      }
      setAuctionList(list)
    } catch (error) {
      console.log('error', error)
    }
  }

  const getRewardList = async () => {
    try {
      let list: RewardListType[] = []
      for (let i = 0; i < 1; i++) {
        list.push({
          iamge: REWARD_DEFAULT_IMAGE,
          name: 'Huobi x McGrady NFT',
        })
      }
      setRewardList(list)
    } catch (error) {
      console.log('error', error)
    }
  }

  return { auctionList, rewardList, isAuction, isAuctionSuccess }
}
