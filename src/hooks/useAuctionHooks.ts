import { OffersListType } from '@/common/data.d'
import { useEffect, useState } from 'react'

interface Type {
  key: any
}

export const useAuctionHooks = (props: Type) => {
  const { key } = props
  const [offersList, setOffersList] = useState<OffersListType[]>([])
  const [times] = useState<any>(66)

  useEffect(() => {
    if (key) getOffersList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const getOffersList = async () => {
    let list: OffersListType[] = []
    for (let i = 0; i < 0; i++) {
      let expiration = 'about 1 hour'
      list.push({
        key: i.toString(),
        price: '2000000000000000000',
        floorDifference: '58% below',
        isHight: i === 0 ? true : false,
        expiration,
        from: '1BB63F',
      })
    }
    setOffersList(list)
  }

  return { offersList, times }
}
