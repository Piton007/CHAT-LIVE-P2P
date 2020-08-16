import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Register",
    component:Register
  },
  {
    path: "/chat",
    name: "Home",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue")
  },
  {
    path: "/viewer",
    name: "Viewer",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Viewer.vue")
  },
  {
    path: "/about",
    name: "About",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
 
  {
    path:"/shared",
    name:"SharedScreen",
  
    component: () =>
    import(/* webpackChunkName: "about" */ "../components/SharedScreen.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to,from,next)=>{
  if (to.matched.some(record => record.meta.requiresAuth) && !sessionStorage.getItem("isLogged"))
    next({name:"Register"})
  else
    next()
})

export default router;
