import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
const routes = [
    {
        path: '/:id',
        name: 'home',
        component: Home,
        props: true
    }
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: "active"
});