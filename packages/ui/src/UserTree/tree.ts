import type { UserItem } from '..'

export class DNode {
  id: string
  name: string
  type: 0 | 1
  stateNode: DNode | null

  child: DNode | null
  sibling: DNode | null
  return: DNode | null
  constructor(node: UserItem) {
    this.id = node.id
    this.name = node.name
    this.type = node.type
    this.stateNode = null
    this.child = null
    this.sibling = null
    this.return = null
  }
}

export function initialData(list: UserItem[]): DNode[] {
  const nodeList: DNode[] = []
  list.forEach((item) => {
    const node = new DNode(item)
    nodeList.push(node)
  })
  return nodeList
}
