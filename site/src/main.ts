import { createApp } from 'vue'
import { App } from './App'
import './assets/base.css'
import './assets/vars.css'
import 'hjxz-design/es/style.css'
import 'uno.css'
import { setupRouter } from './router'

function bootstrap() {
  const app = createApp(App)
  setupRouter(app)
  app.mount('#app')
}
bootstrap()
