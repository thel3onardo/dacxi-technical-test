import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/index.css'

/** Fonts */
import '@fontsource/lexend/400.css'
import '@fontsource/lexend/500.css'
import '@fontsource/lexend/600.css'
import '@fontsource/lexend/700.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/500.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
