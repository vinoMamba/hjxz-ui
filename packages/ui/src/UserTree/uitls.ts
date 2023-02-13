import type { UserItem } from '..'

export function updateTreeCheckedStatus(list: UserItem[], item: UserItem, checked: boolean) {
  const parents = findAllParent(list, item)
  parents.forEach((parent) => {
    parent.indeterminate = !parent.children?.every(i => i.checked)
    parent.checked = !parent.indeterminate
  })
  updateAllChildren(item.children || [], checked)
}

export function findAllParent(list: UserItem[], item: UserItem) {
  const parents: UserItem[] = []
  const find = (list: UserItem[], item: UserItem) => {
    for (const i of list) {
      if (i.id === item.id) {
        return true
      }
      if (i.children && i.children.length) {
        if (find(i.children, item)) {
          parents.push(i)
          return true
        }
      }
    }
  }
  find(list, item)
  return parents
}

export function updateAllChildren(children: UserItem[], checked: boolean) {
  children.forEach((child) => {
    child.checked = checked
    child.indeterminate = false
    if (child.children?.length) {
      updateAllChildren(child.children, checked)
    }
  })
}

export function getListByCheckStatus(list: UserItem[], checked: boolean) {
  const res: UserItem[] = []
  const find = (list: UserItem[]) => {
    for (const i of list) {
      if (i.checked === checked) {
        res.push(i)
      }
      if (i.children?.length) {
        find(i.children)
      }
    }
  }
  find(list)
  return res
}
