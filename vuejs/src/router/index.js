import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: '/login'
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true,
    }, 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach ((to, from, next) => {

  if (store.getters['user'] && !to.meta.public) {
    next("/login");
  }

  next ()
})

export default router;
