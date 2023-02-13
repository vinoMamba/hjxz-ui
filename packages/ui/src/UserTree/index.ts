import type { App, Plugin } from 'vue'
import { UserTree } from './UserTree'

UserTree.install = (app: App) => {
  app.component(UserTree.name, UserTree)
  return app
}

export default UserTree as typeof UserTree & Plugin

export interface UserItem {
  id: string
  name: string
  children?: UserItem[]
  checked: boolean
  type: 0 | 1 // 0:部门 1:人员
  [key: string]: any
}
