import { memo } from 'react'
import type { AuctionListType } from '@/common/data.d'
import { Image, Divider } from 'antd'
import { AuctionModalWrapper, AuctionModalContent, AuctionTile, AuctionH2, AuctionEdition, AuctionTimes } from './styled'
// import useDataHooks from '@/hooks/useDataHooks'
// import type { ConstantInitTypes } from '@/contracts/constantInit'
import { useTranslation } from 'react-i18next'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import { Link } from 'react-router-dom'
import moment from 'moment'

interface Type {
  details: AuctionListType
  keyTop?: boolean
}

export default memo(function AuctionModalPage(params: Type) {
  const { details, keyTop = false } = params
  const { windowSize } = useWindowSizeHooks()
  const { t } = useTranslation()

  // const dataInit: ConstantInitTypes = useDataHooks()
  // const {} = dataInit
  const CURRENT_TIMESTAMP = moment().format('X')

  return (
    <AuctionModalWrapper>
      <Link to={`/auction/${details.numberKey}`}>
        <AuctionModalContent style={{ marginBottom: keyTop ? '0' : 'calc(5.63rem + 8.75rem)' }}>
          <Image src={details.iamge} preview={false} className="auction-image"></Image>
          <div style={{ height: windowSize.innerWidth >= Adapth5 ? '22.25rem' : '13.31rem' }}></div>
          <AuctionTile>{details.name}</AuctionTile>
          <h4>{t('home.auction.h4')}</h4>
          <AuctionH2>
            {details.totalPrice}&nbsp;<span>{t('home.auction.h2')}</span>
          </AuctionH2>
          <AuctionEdition>
            {t('home.auction.edition')}:&nbsp;{details.amount}
          </AuctionEdition>
          <Divider plain className="gray"></Divider>
          {CURRENT_TIMESTAMP < details.opening && (
            <AuctionTimes>
              <span>
                <span className="span">{t('home.auction.tims')}</span>
                {details.startTime} - {details.endTime}
              </span>
            </AuctionTimes>
          )}
          {CURRENT_TIMESTAMP >= details.opening && CURRENT_TIMESTAMP < details.finish && (
            <AuctionTimes
              style={{
                background: '#5927EF',
                color: '#FFFFFF',
              }}
            >
              <span>
                <span className="span">{t('home.auction.tims')}</span>
                {details.startTime} - {details.endTime}
              </span>
            </AuctionTimes>
          )}
          {CURRENT_TIMESTAMP >= details.finish && (
            <AuctionTimes
              style={{
                background: 'rgba(130, 130, 130, 0.1)',
                color: '#606060',
              }}
            >
              <span>
                <span className="span">{t('home.auction.tims')}</span>
                {details.startTime} - {details.endTime}
              </span>
            </AuctionTimes>
          )}
        </AuctionModalContent>
      </Link>
    </AuctionModalWrapper>
  )
})
