import { createApp } from 'vue'
import Login from './components/Login.vue'

import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Form, Field, CellGroup, Button } from 'vant';

import 'vant/lib/index.css';


const routes = [
    { path: '/', component: Login },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Button);
app.mount('#app')
