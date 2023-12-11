import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("../views/NotFound"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('auth')) {
        next('/dashboard')
      } else {
        next()
      }
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/Register")
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
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/seguimientos",
    name: "seguimientos",
    component: () => import("../views/seguimientos/IndexDataTable")
  },
  {
    path: "/grafico",
    name: "grafico",
    component: () => import("../views/seguimientos/Grafico")
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

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.requiresAuth);
  if (protectedRoute && localStorage.getItem('auth')) {
    next('/login');
  } else {
    next();
  }
});
export default router;
