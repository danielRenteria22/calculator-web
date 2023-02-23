import { createApp } from 'vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Form, Field, CellGroup, Button, Dialog, RadioGroup, Radio } from 'vant';

import 'vant/lib/index.css';


const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
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
app.use(Dialog);
app.use(Radio);
app.use(RadioGroup);
app.mount('#app')
