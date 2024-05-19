import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
 import Home from '@/views/Home/index.vue'
 import Category from '@/views/Category/index.vue'
// import SubCategory from '@/views/SubCategory/index.vue'
// import Detail from '@/views/Detail/index.vue'
// import CartList from '@/views/CartList/index.vue'
// import Checkout from '@/views/Checkout/index.vue'
// import Pay from '@/views/Pay/index.vue'
// import PayBack from '@/views/Pay/PayBack.vue'
// import Member from '@/views/Member/index.vue'
// import UserInfo from '@/views/Member/components/UserInfo.vue'
// import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    
     {path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        }]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
