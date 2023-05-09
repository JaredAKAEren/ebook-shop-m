import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      alias: '/index',
      redirect: '/home',
      component: () => import('../views/IndexView.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          meta: {
            title: '首页'
          },
          component: () => import('../views/HomeView/HomeView.vue')
        },
        {
          path: 'category',
          name: 'Category',
          meta: {
            title: '分类'
          },
          component: () => import('../views/CategoryView/CategoryView.vue')
        },
        {
          path: 'cart',
          name: 'Cart',
          meta: {
            title: '购物车',
            requireAuth: true
          },
          component: () => import('../views/CartView/CartView.vue')
        },
        {
          path: 'user',
          name: 'User',
          meta: {
            title: '我的'
          },
          component: () => import('../views/UserView/UserView.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        title: '注册'
      },
      component: () => import('../views/UserView/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: () => import('../views/UserView/LoginView.vue')
    },
    {
      path: '/book/:id',
      name: 'BookDetail',
      meta: {
        title: '图书详情'
      },
      component: () => import('../views/BookView/BookView.vue')
    },
    {
      path: '/address',
      name: 'Address',
      meta: {
        title: '地址管理',
        requireAuth: true
      },
      component: () => import('../views/UserView/AddressView.vue')
    },
    {
      path: '/address-detail',
      name: 'AddressDetil',
      meta: {
        title: '新增地址',
        requireAuth: true
      },
      component: () => import('../views/UserView/AddressDetailView.vue')
    },
    {
      path: '/order',
      name: 'Order',
      meta: {
        title: '订单',
        requireAuth: true
      },
      component: () => import('../views/OrderView/OrderView.vue')
    },
    {
      path: '/order-preview',
      name: 'OrderPreview',
      meta: {
        title: '订单预览',
        requireAuth: true
      },
      component: () => import('../views/UserView/OrderPreviewView.vue')
    },
    {
      path: '/order-detail',
      name: 'OrderDetail',
      meta: {
        title: '订单详情',
        requireAuth: true
      },
      component: () => import('../views/OrderDetailView/OrderDetailView.vue')
    }
  ]
})

export default router
