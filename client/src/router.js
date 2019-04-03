import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Register from './views/Register.vue'
import Notfound from './views/404.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Infoshow from './views/Infoshow.vue'
import Fundlist from './views/Fundlist.vue'
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: "", component: Home },
        { path: "/home", name: "home", component: Home },
        { path: "/infoshow", name: "infoshow", component: Infoshow },
        { path: "/fundlist", name: "fundlist", component: Fundlist }

      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/Notfound',
      name: '/404',
      component: Notfound
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

//路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.eleToken ? true : false
  if(to.path == "/login" || to.path == "/register"){
    next()
  }else{
    isLogin ? next() : next("/login")
  }
})

export default router;