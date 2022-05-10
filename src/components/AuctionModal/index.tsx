import { memo } from 'react'
import type { AuctionListType } from '@/common/data.d'
import { Image, Divider } from 'antd'
import { AuctionModalWrapper, AuctionModalContent, AuctionTile, AuctionH2, AuctionEdition, AuctionTimes } from './styled'
import useDataHooks from '@/hooks/useDataHooks'
import type { ConstantInitTypes } from '@/contracts/constantInit'
import { useTranslation } from 'react-i18next'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import { Link } from 'react-router-dom'

interface Type {
  details: AuctionListType
}

export default memo(function AuctionModalPage(params: Type) {
  const { details } = params
  const { windowSize } = useWindowSizeHooks()
  const { t } = useTranslation()

  const dataInit: ConstantInitTypes = useDataHooks()
  const { toWeiFromWei } = dataInit

  return (
    <AuctionModalWrapper>
      <Link to={`/auction/${details.key}`}>
        <AuctionModalContent>
          <Image src={details.iamge} preview={false} className="auction-image"></Image>
          <div style={{ height: windowSize.innerWidth >= Adapth5 ? '22.25rem' : '13.31rem' }}></div>
          <AuctionTile>{details.name}</AuctionTile>
          <h4>{t('home.auction.h4')}</h4>
          <AuctionH2>
            {toWeiFromWei(details.price)}&nbsp;<span>{t('home.auction.h2')}</span>
          </AuctionH2>
          <AuctionEdition>
            {t('home.auction.edition')}:&nbsp;{details.edition}
          </AuctionEdition>
          <Divider plain className="gray"></Divider>
          <AuctionTimes>
            {t('home.auction.tims')}&nbsp;&nbsp;&nbsp;{details.startTime}&nbsp;-&nbsp;{details.endTime}
          </AuctionTimes>
        </AuctionModalContent>
      </Link>
    </AuctionModalWrapper>
  )
})
