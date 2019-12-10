import React from 'react'
import { Routes } from '@/typings/component'
import Loadable from 'react-loadable'

export const routesConfig: Routes[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "Home" */ '@/pages/Home'),
      loading: () => <div>loading</div>,
    }),
    children: [
      {
        path: '/home/in',
        component: Loadable({
          loader: () => import(/* webpackChunkName: "In" */ '@/pages/Home/In'),
          loading: () => <div>loading</div>,
        }),
      },
    ],
  },
]