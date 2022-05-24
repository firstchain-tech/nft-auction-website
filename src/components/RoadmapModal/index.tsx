import { memo } from 'react'
import { RoadmapModalWrapper, RoadmapModalTitle, RoadmapModalContent } from './styled'
import { RoadmapListType } from '@/common/data.d'
import { useTranslation } from 'react-i18next'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'

interface Type {
  details: RoadmapListType
  num: number
}

export default memo(function RoadmapModalPage(props: Type) {
  const { details, num } = props
  const { t } = useTranslation()
  const { windowSize } = useWindowSizeHooks()

  return (
    <RoadmapModalWrapper>
      <RoadmapModalTitle>
        <h3>{details.name}</h3>
        {windowSize.innerWidth >= Adapth5 ? (
          <>
            <span>{t('home.about.modal.title')}&nbsp;</span>
            <h5>
              {details.amount}&nbsp;{details.unit}.
            </h5>
          </>
        ) : (
          <div style={{ display: 'flex', marginTop: '0.63rem', alignItems: 'center' }}>
            <span>{t('home.about.modal.title')}&nbsp;</span>
            <h5>
              {details.amount}&nbsp;{details.unit}.
            </h5>
          </div>
        )}
      </RoadmapModalTitle>
      <RoadmapModalContent>
        {details.content.map((item, i) => (
          <li key={i} style={{fontWeight: (i === 0 && num === 0) ? 'bold':'400'}}>{item}</li>
        ))}
      </RoadmapModalContent>
    </RoadmapModalWrapper>
  )
})
