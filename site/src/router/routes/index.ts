import type { RouteRecordRaw } from 'vue-router'
import { Home } from '../../views/Home'
import { Doc } from '../../views/Doc'
import { ButtonDemo } from '../../page/ButtonDemo'

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
  redirect: '/doc/button',
  component: Doc,
  children: [
    {
      path: 'button',
      name: 'Button',
      component: ButtonDemo,
    },
  ],
}

export const basicRoutes = [RootRouter, HomeRouter, DocRouter]
