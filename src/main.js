import { createApp } from 'vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Records from './components/Records.vue'

import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Form, Field, CellGroup, Button, Dialog, RadioGroup, Radio, NavBar, Col, Row ,Pagination, Picker, Popup} from 'vant';

import 'vant/lib/index.css';


const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/records', component: Records },
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
app.use(NavBar);
app.use(Col);
app.use(Row);
app.use(Pagination);
app.use(Picker);
app.use(Popup);
app.mount('#app')
