import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import VueChartkick from 'vue-chartkick'
import { Chart, LinearScale, CategoryScale, LineElement, LineController, PointElement, Filler } from 'chart.js'

import App from './App.vue'
import messages from './locales/messages'

import 'virtual:windi.css'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  fallbackLocale: 'en',
  messages
})

Chart.register(LinearScale, CategoryScale, LineElement, LineController, PointElement, Filler)

const app = createApp(App)

app.use(i18n)
app.use(VueChartkick.use(Chart))
app.mount('#app')
