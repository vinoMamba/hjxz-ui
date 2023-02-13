import { computed, defineComponent, ref } from 'vue'
import { DButton } from '..'
import './style'

export const Modal = defineComponent({
  name: 'DModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:visible', 'cancel', 'ok'],
  setup(props, { slots, emit }) {
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const classesRef = computed(() => {
      return ['dtd-modal-display', props.visible ? 'dtd-modal-visible' : '']
    })
    const wrapperClassesRef = computed(() => {
      return ['dtd-modal-wrapper', props.centered ? 'dtd-modal-centered' : '']
    })
    const cancel = (e: MouseEvent) => {
      emit('cancel', e)
    }
    const ok = (e: MouseEvent) => {
      emit('ok', e)
    }
    const clickOnClose = () => {
      emit('update:visible', false)
    }
    return () => (
      <div ref={wrapperRef}>
        {props.visible
          ? (
            <div class={classesRef.value}>
              <div class="dtd-modal-overlay" />
              <div class={wrapperClassesRef.value}>
                <div class="dtd-modal">
                  {!props.hideHeader && (
                    <header>
                      <div class="dtd-modal-title">{slots.title?.()}</div>
                      {props.closable && (
                        <i class="dtd-modal-close" onClick={() => clickOnClose()}>
                          x
                        </i>
                      )}
                    </header>
                  )}
                  <main class={props.dense ? 'dtd-modal-dense' : ''}>{slots.content?.()}</main>
                  <footer>
                    {slots.footer
                      ? (
                          slots.footer?.()
                        )
                      : (
                        <div class="dtd-modal-button-wrapper">
                          <DButton onClick={e => cancel(e)}>取消</DButton>
                          <DButton type="primary" onClick={(e: MouseEvent) => ok(e)}>
                            确定
                          </DButton>
                        </div>
                        )}
                  </footer>
                </div>
              </div>
            </div>
            )
          : null}
      </div>
    )
  },
})
