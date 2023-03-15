import type { RouteRecordRaw } from 'vue-router'
import { Home } from '../../views/Home'
import { Doc } from '../../views/Doc'

const RootRouter: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
}
const HomeRouter: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: Home,
}
const DocRouter: RouteRecordRaw = {
  path: '/doc',
  name: 'Doc',
  component: Doc,
  children: [
    {
      path: 'userTree',
      name: 'UserTree',
      component: () => import('../../page/TreeDemo.vue'),
    },
  ],
}

export const basicRoutes = [RootRouter, HomeRouter, DocRouter]
