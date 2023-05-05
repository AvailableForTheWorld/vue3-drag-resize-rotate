import drr from './components/drr.vue'
import { App } from 'vue'

drr.install = (app: App) => {
  app.component(drr.__name as string, drr)
}

export default drr
