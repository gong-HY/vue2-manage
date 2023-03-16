import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/MainView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [
      { path: 'home', name: 'Home', component: () => import('../views/HomeView.vue') },
      { path: 'user', name: 'User', component: () => import('../views/UserView.vue'), meta: { title: '用户管理', breadcrumb: '用户管理' } },
      { path: 'mall', name: 'Mall', component: () => import('../views/MallView.vue'), meta: { title: '商品管理', breadcrumb: '商品管理' } },
      {
        path: '/other',
        name: 'Other',
        component: () => import('../views/OtherView.vue'),
        meta: { title: '其他', breadcrumb: '其他' },
        redirect: '/other/page1',
        children: [
          { path: 'page1', name: 'Page1', component: () => import('../views/PageOneView.vue'), meta: { title: 'page1', breadcrumb: 'page1' } },
          { path: 'page2', name: 'Page2', component: () => import('../views/PageTwoView.vue'), meta: { title: 'page2', breadcrumb: 'page2' } },
        ]
      }

    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')

  }

]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path != '/login' && !token) {
    next('/login')
  } else next()
})

export default router
