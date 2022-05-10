import React, { memo } from 'react'
import styled from 'styled-components'
import routes from '@/router'
import Web3Provider from '@/components/Web3Provider'
import { renderRoutes } from 'react-router-config'

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`

export default memo(() => (
  <Web3Provider>
    <AppWrapper>{renderRoutes(routes)}</AppWrapper>
  </Web3Provider>
))
