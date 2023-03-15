import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export interface ApiType {
  attr: string
  notes: string
  type: string
  optionalValue: string
  default: string
}
const ApiSpan = defineComponent({
  name: 'ApiSpan',
  setup(_, { slots }) {
    return () => <span class='api-span'>{slots.default?.()}</span>
  },
})
const ApiProps = {
  apiList: {
    type: Array as PropType<ApiType[]>,
    default: () => [],
  },
} as const
export const Api = defineComponent({
  props: ApiProps,
  setup(props) {
    return () => (
      <div class='border border-solid border-#d9d9d9 rounded-8 p-16 mt-16 hover:demo-hover'>
        <h4 class='italic text-24 text-black opacity-85 font-600 my-8'>Attributes</h4>
        <div>
          <ul>
            <li class='api-li'>
              <ApiSpan>属性</ApiSpan>
              <ApiSpan>说明</ApiSpan>
              <ApiSpan>类型</ApiSpan>
              <ApiSpan>可选值</ApiSpan>
              <ApiSpan>默认值</ApiSpan>
            </li>
            {props.apiList.map(item => (
              <li class='api-li [&:last-child]:border-none' key={item.attr}>
                <ApiSpan>{item.attr}</ApiSpan>
                <ApiSpan>{item.notes}</ApiSpan>
                <ApiSpan>{item.type}</ApiSpan>
                <ApiSpan>{item.optionalValue}</ApiSpan>
                <ApiSpan>{item.default}</ApiSpan>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
})
