import { createApp } from 'vue'
import { createPinia } from 'pinia'

// vuetify install
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//fin instalacion vuetify

// import firebase 
import { VueFire, VueFireAuth } from "vuefire"
import { firebaseApp } from './config/firebase.js'

import App from './App.vue'
import router from './router'

import './assets/main.css'



const app = createApp(App)

//vuetify usar en la aplicacion
const vuetify = createVuetify({
    components,
    directives
})
app.use(vuetify)

//firebase usar en la aplicacion
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()]
})


app.use(createPinia())
app.use(router)

app.mount('#app')
