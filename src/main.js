import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vuetify install
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Firebase install
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './config/firebase.js';

import App from './App.vue';
import router from './router';

import './assets/main.css';
// importas fuente y material desing
import '@mdi/font/css/materialdesignicons.css';


const app = createApp(App);


// Vuetify
const vuetify = createVuetify({
    components,
    directives,
});
app.use(vuetify);

// Firebase
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
});

app.use(createPinia());
app.use(router);

app.mount('#app');
