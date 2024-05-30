import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../pages/Blog.vue'
import Form from '../pages/Form.vue'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Todo from '../pages/Todo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home 
    },
    {
      path: '/form',
      name: 'Form',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/Form.vue') // 动态导入组件，提高性能
    },
    {
      path: '/blog',
      name: 'Blog',
      component:Blog 
    },
    {
      path: '/login',
      name: 'Login',
      component:Login 
    },
    {
      path: '/todo',
      name: 'Todo',
      component:Todo
    },
  ]
})

export default router
