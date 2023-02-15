import type { DNode } from '..'

export function getAllCheckedNodes(treeData: DNode[], mode: 0 | 1): DNode[] {
  const result: DNode[] = []
  treeData.forEach((node) => {
    if (node.checked && mode === node.type) {
      result.push(node)
    }
    if (node.children) {
      result.push(...getAllCheckedNodes(node.children, mode))
    }
  })
  return result
}

/**
 *  更新树节点的选中状态(多选)
 * @param treeData
 * @param node
 * @param checked
 */
export function updateTreeStatus(treeData: DNode[], node: DNode, checked: boolean) {
  const children = getAllChildren(node)
  if (children) {
    children.forEach((child) => {
      child.checked = checked
      child.indeterminate = checked ? false : child.indeterminate
    })
  }
  const parents = getAllParents(treeData, node.id)
  if (parents) {
    parents.forEach((parent) => {
      const children = getAllChildren(parent)
      parent.checked = children!.every(child => child.checked)
      parent.indeterminate = children!.some(child => child.checked) && !parent.checked
    })
  }
}

export function updateTreeStatusSingle(treeData: DNode[], node: DNode) {
  // TODO
}

function getAllChildren(node: DNode) {
  const result: DNode[] = []
  const dfs = (node: DNode) => {
    if (node.children) {
      node.children.forEach((child) => {
        result.push(child)
        dfs(child)
      })
    }
  }
  dfs(node)
  return result
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

export function updateStatusByNode(treeData: DNode[], node: DNode, checked: boolean) {
  let updateNode: DNode | undefined
  const tree = treeData
  const dfs = (treeData: DNode[], node: DNode, checked: boolean) => {
    treeData.forEach((item) => {
      if (item.id === node.id) {
        item.checked = checked
        item.indeterminate = false
        updateNode = item
      }
      if (item.children) {
        dfs(item.children, node, checked)
      }
    })
  }
  dfs(treeData, node, checked)
  if (updateNode) {
    updateTreeStatus(tree, updateNode, checked)
  }
}
