import type { UserItem } from '../../ui/src'

export const treeData: UserItem[] = [
  {
    id: '0',
    name: '网钉',
    checked: false,
    children: [
      {
        id: '0-0',
        name: '网钉-1',
        checked: false,
        type: 0,
        children: [
          { id: '0-0-0', name: '网钉-1-1', checked: false, type: 0 },
          { id: '0-0-1', name: '网钉-1-2', checked: false, type: 0 },
          { id: '0-0-2', name: '网钉-1-3', checked: false, type: 0 },
          { id: '0-0-3', name: '人员-1-4', checked: false, type: 1 },
          { id: '0-0-4', name: '人员-1-5', checked: false, type: 1 },
        ],
      },
      { id: '0-1', name: '网钉-2', checked: false, type: 0 },
      { id: '0-2', name: '网钉-3', checked: false, type: 0 },
      { id: '0-3', name: '网钉-4', checked: false, type: 0 },
      { id: '0-4', name: '人员-1', checked: false, type: 1 },
      { id: '0-5', name: '人员-2', checked: false, type: 1 },
      { id: '0-6', name: '人员-3', checked: false, type: 1 },
      { id: '0-7', name: '人员-4', checked: false, type: 1 },
    ],
    type: 0,
  },
  { id: '1', name: '人员', checked: false, type: 1 },
]
