import type { PropType } from 'vue'
import { Transition, defineComponent, h } from 'vue'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export interface DemoType {
  codeVisible: boolean
  title: string
  component: Object
}

const Prism = (window as any).Prism

export const Demo = defineComponent({
  name: 'Demo',
  props: {
    demoList: {
      type: Array as PropType<DemoType[]>,
      default: () => [],
    },
    title: {
      type: String,
      default: '功能操作',
    },
  },
  setup(props) {
    const getHtml = (component: any) => {
      return Prism.highlight(component.__sourceCode, Prism.languages.html, 'html')
    }
    return () => (
      <>
        <h6 class='mb-16 text-24 font-600 italic text-#38687d hover:underline'>{props.title}</h6>
        {props.demoList.map(demo => (
          <div class='demo-border py-16 px-32 pl-0 rounded-8 hover:demo-hover' key={demo.title}>
            <p class='text-15 font-500 px-8 py-16 border-b border-#d9d9d9'>{demo.title}</p>
            <div class='p-16'>{h(demo.component)}</div>
            <div class='px-8 py-16 border-t-dotted border-#d9d9d9'>
              {demo.codeVisible
                ? (
                  <div
                    class='cursor-pointer text-14  p-8 inline-block bg-#d9d9d9 rounded-4'
                    onClick={() => (demo.codeVisible = false)}>
                    隐藏示例代码
                  </div>
                  )
                : (
                  <div
                    class='cursor-pointer text-14 text-white p-8 inline-block bg-#2d2d2d rounded-4'
                    onClick={() => (demo.codeVisible = true)}
                  >
                    查看示例代码
                  </div>
                  )}
            </div>
            <Transition name=''>
              {demo.codeVisible
                ? (
                  <div class='overflow-auto px-8 py-16 border-t-dotted border-#d9d9d9 '>
                    <pre class='text-16' v-html={getHtml(demo.component)}></pre>
                  </div>
                  )
                : null}
            </Transition>
          </div>
        ))}
      </>
    )
  },
})
