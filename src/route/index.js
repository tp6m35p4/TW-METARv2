import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Airport from "../components/Airport.vue";
const routes = [
  {
    path: "/:id",
    name: "home",
    component: Airport,
    props: true,
  },
  {
    path: "/",
    name: "index",
    component: Home,
    props: true,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});
