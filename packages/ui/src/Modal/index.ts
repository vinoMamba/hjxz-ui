import type { App, Plugin } from 'vue'
import { Modal } from './Modal'

Modal.install = (app: App) => {
  app.component(Modal.name, Modal)
  return app
}

export default Modal as typeof Modal & Plugin
