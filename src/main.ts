import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import VueChartkick from 'vue-chartkick'
import { Chart, LinearScale, CategoryScale, LineElement, LineController, PointElement, Filler } from 'chart.js'

import App from './App.vue'
import * as messages from './locales/messages.json'

import 'virtual:windi.css'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: (messages as any).default
})

Chart.register(LinearScale, CategoryScale, LineElement, LineController, PointElement, Filler)

const app = createApp(App)

app.use(i18n)
app.use(VueChartkick.use(Chart))
app.mount('#app')
