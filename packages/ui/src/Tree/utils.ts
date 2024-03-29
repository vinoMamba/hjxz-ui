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
  clearAllChecked(treeData)
  node.checked = true
  const parents = getAllParents(treeData, node.id)
  parents?.forEach(item => item.indeterminate = true)
}

export function clearAllChecked(treeData: DNode[]) {
  treeData.forEach((node) => {
    node.checked = false
    node.indeterminate = false
    if (node.children) {
      clearAllChecked(node.children)
    }
  })
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
}

export function updateDisabledByNode(treeData: DNode[], node: DNode, disabled: boolean) {
  let updateNode: DNode | undefined
  const tree = treeData
  const dfs = (treeData: DNode[], node: DNode, disabled: boolean) => {
    treeData.forEach((item) => {
      if (item.id === node.id) {
        item.disabled = disabled
        updateNode = item
      }
      if (item.children) {
        dfs(item.children, node, disabled)
      }
    })
  }
  dfs(treeData, node, disabled)
}

/**
 *  遍历数据，生成树结构
 * @param apiData
 * @param sort 0 -> 往前unshift  1 -> 往后push
 * @returns
 */
export function createTree(apiData: any[], key = 'id', sort = 0) {
  const map = new Map<string, any>()
  const tree: any[] = []
  apiData.forEach((item) => {
    map.set(item[key], item)
  })
  apiData.forEach((item) => {
    const parent = map.get(item.parentId)
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      sort ? parent.children.push(item) : parent.children.unshift(item)
    }
    else {
      sort ? tree.push(item) : tree.unshift(item)
    }
  })
  return tree
}

/**
 *  遍历树
 */
export function traverseTree(treeData: DNode[], callback: (node: DNode) => void) {
  treeData.forEach((node) => {
    callback(node)
    if (node.children) {
      traverseTree(node.children, callback)
    }
  })
}
