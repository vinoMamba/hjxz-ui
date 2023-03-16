import type { RouteRecordRaw } from 'vue-router'
import { Home } from '../../views/Home'
import { Doc } from '../../views/Doc'
import { ButtonDemo } from '../../page/ButtonDemo'
import { AvatarDemo } from '../../page/AvatarDemo'
import { TreeDemo } from '../../page/TreeDemo'

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
    {
      path: 'avatar',
      name: 'Avatar',
      component: AvatarDemo,
    },
    {
      path: 'tree',
      name: 'Tree',
      component: TreeDemo,
    },
  ],
}

export const basicRoutes = [RootRouter, HomeRouter, DocRouter]
