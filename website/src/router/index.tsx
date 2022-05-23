import Home from '@/pages/Home'
import Auction from '@/pages/Auction'
import No404 from '@/pages/404'
import Layout from '@/layout'
import { Redirect } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'

const Router: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to="/home" />,
      },
      {
        path: '/home',
        exact: true,
        component: Home,
      },
      {
        path: '/auction/:id',
        exact: true,
        component: Auction,
      },
      {
        path: '/404',
        component: No404,
      },
      {
        path: '*',
        component: No404,
      },
    ],
  },
  {
    path: '/404',
    component: No404,
  },
  {
    path: '*',
    component: No404,
  },
]

export default Router
