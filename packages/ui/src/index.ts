import type { App } from 'vue'
import * as components from './components'

export * from './components'

export default {
  install(app: App) {
    for (const componentKey in components) {
      // @ts-expect-error - ignore the fact that the key is not a string
      const component = components[componentKey]
      if (component.install)
        component.install(app)
    }
    return app
  },
}
