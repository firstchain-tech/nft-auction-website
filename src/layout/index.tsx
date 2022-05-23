import React, { memo } from 'react'
import { LayoutWrapper, LayoutContent } from './styled'
import { renderRoutes } from 'react-router-config'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export default memo(function LayOutPages(props: any) {
  const { route } = props
  return (
    <LayoutWrapper>
      <div className="layout-tabber">
        <TopBar />
      </div>
      <LayoutContent>{route && renderRoutes(route.routes)}</LayoutContent>
      <div className="layout-footer">
        <Footer />
      </div>
    </LayoutWrapper>
  )
})
