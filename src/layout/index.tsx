import React, { memo } from 'react'
import { LayoutWrapper, LayoutContent } from './styled'
import { renderRoutes } from 'react-router-config'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import { ComLayout } from '@/common/styled'

export default memo(function LayOutPages(props: any) {
  const { route } = props
  return (
    <LayoutWrapper>
      <ComLayout className="layout-tabber">
        <TopBar />
      </ComLayout>
      <LayoutContent>{route && renderRoutes(route.routes)}</LayoutContent>
      <ComLayout>
        <Footer />
      </ComLayout>
    </LayoutWrapper>
  )
})
