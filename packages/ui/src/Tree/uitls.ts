import type { DNode } from '..'

export function getAllCheckedNodes(treeData: DNode[]): DNode[] {
  const result: DNode[] = []
  treeData.forEach((node) => {
    if (node.checked && node.type === 1) {
      result.push(node)
    }
    if (node.children) {
      result.push(...getAllCheckedNodes(node.children))
    }
  })
  return result
}

export function updateTreeStatus(treeData: DNode[], node: DNode, checked: boolean) {
  const { children } = node
  if (children) {
    children.forEach((child) => {
      child.checked = checked
      updateTreeStatus(treeData, child, checked)
    })
  }
  const parents = getAllParents(treeData, node.id)
  if (parents) {
    parents.forEach((parent) => {
      const { children } = parent
      parent.checked = children!.every(child => child.checked)
      parent.indeterminate = children!.some(child => child.checked) && !parent.checked
    })
  }
}

function getAllParents(list: DNode[], id: string): DNode[] | undefined {
  for (const i in list) {
    if (list[i].id === id) {
      return []
    }
    if (list[i].children) {
      const node = getAllParents(list[i].children!, id) as DNode[]
      if (node !== undefined) {
        return node.concat(list[i])
      }
    }
  }
}
