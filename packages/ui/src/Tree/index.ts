import type { App, Plugin } from 'vue'
import { DTree } from './DTree'

DTree.install = (app: App) => {
  app.component(DTree.name, DTree)
  return app
}

export default DTree as typeof DTree & Plugin

export interface DNode {
  id: string
  name: string
  children?: DNode[]
  type: 0 | 1 // 0:部门 1:人员
  checked?: boolean
  indeterminate?: boolean
  [key: string]: any
}
