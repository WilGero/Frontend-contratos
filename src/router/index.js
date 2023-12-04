import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../components/LoginComponent.vue")
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: ()=>import("../views/NotFound"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/users/Index")
  },
  {
    path: "/contratos",
    name: "contratos",
    component: () => import("../views/contratos/Index")
  },
  {
    path: "/contratos/:id",
    name: "contratoDetails",
    component: () => import("../views/contratos/ContratoDetails")
  },
  {
    path: "/institutions",
    name: "institutions",
    component: () => import("../views/institutions/Index")
  },
  {
    path: "/institutions/:id",
    name: "institutionDetails",
    component: () => import("../views/institutions/InstitutionDetails")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
