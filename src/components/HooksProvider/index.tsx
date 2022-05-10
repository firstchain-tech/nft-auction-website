import { useChainIdHooks } from '@/hooks/useChainIdHooks'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { AdaptFontSize } from '@/utils'
import { useEffect, useState } from 'react'

const HooksProviderPage = ({ children }: any) => {
  useChainIdHooks()

  const { windowSize } = useWindowSizeHooks()
  const [isStyleSuccess, setIsStyleSuccess] = useState(false)
  const [isH5Web, setIsH5Web] = useState<'h5' | 'web'>('web')

  useEffect(() => {
    if (windowSize.innerWidth < AdaptFontSize) setIsH5Web('h5')
    if (windowSize.innerWidth >= AdaptFontSize) setIsH5Web('web')
    if (isStyleSuccess) return
    if (windowSize.innerWidth < AdaptFontSize) {
      let fontSize =
        windowSize.innerWidth >= AdaptFontSize
          ? '100%'
          : `${(windowSize.innerWidth / AdaptFontSize) * 100 > 63 ? (windowSize.innerWidth / AdaptFontSize) * 100 : 62.5}%`
      document.documentElement.style.fontSize = fontSize
      setIsStyleSuccess(true)
    } else {
      document.documentElement.style.fontSize = '100%'
      setIsStyleSuccess(true)
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.innerWidth])

  useEffect(() => {
    setIsStyleSuccess(false)
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isH5Web])

  return <>{children}</>
}

export default HooksProviderPage
