import { useEffect, useState } from 'react'

export function useWindowSizeHooks() {
  const getWindowSize = () => ({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  })

  const [windowSize, setWindowSize] = useState(getWindowSize())

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleResize = () => setWindowSize(getWindowSize())

  return { windowSize }
}
