import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import tooltip from './directives/tooltip'
import dateTimeFormat from './filters/date-format'
import currencyFormat from './filters/currency-format'
import messagePlugin from './utils/message-plugin'
import Loader from '@/components/app/Loader'

const app = createApp(App)
app.config.globalProperties.$filters = {
   dateTimeFormat,
   currencyFormat
}
app.component("Loader", Loader)
app.directive('tooltip', tooltip)
app.use(store).use(router).use(messagePlugin).mount('#app')



