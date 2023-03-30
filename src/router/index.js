import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    redirect: "/homelist",
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/user.vue'),
        meta: {
          index: 1,
          requiresAuth: true
        }
      },
      {
        path: '/houses',
        name: "houses",
        component: () => import('@/views/casa/casalist.vue'),
        meta: {
          index: 2
        }
      },
      {
        path: "/rents",
        name: "rents",
        component: () => import('@/views/casa/casarent.vue'),
        meta: {
          index: 3
        }
      },
      {
        path: "/waandel",
        name: "waandel",
        component: () => import('@/views/casa/wandel.vue'),
        meta: {
          index: 4
        }
      },
      {
        path: "/information",
        name: "information",
        component: () => import('@/views/informations/information.vue'),
        meta: {
          index: 5
        }
      },
      {
        path: '/homelist',
        name: "homelist",
        component: () => import("@/views/homePage.vue"),
        meta: {
          index: 6,
          requiresAuth: true
        }
      },
      {
        path: '/building',
        name: 'building',
        component: () => import("@/views/buil/building.vue"),
        meta: {
          index: 7
        }
      },
      {
        path: "/buidetail",
        name: "buidetail",
        component: () => import("@/views/buil/buidetail.vue"),
        meta: {
          index: 8
        }
      },
      {
        path: "/housinglist",
        name: "housinglist",
        component: () => import("@/views/housingList/housing.vue"),
        meta: {
          index: 9
        }
      },
      {
        path: "/roomInformation",
        name: "roomInformation",
        component: () => import("@/views/users/roomInformation.vue"),
        meta: {
          index: 10,
        }
      },
      {
        path: "/rightadm",
        name: "rightadm",
        component: () => import("../views/right/rightadm.vue"),
        meta: {
          index: 11
        }
      },
      {
        path: "/rightList",
        name: "rightList",
        component: () => import("../views/right/rightList.vue"),
        meta: {
          index: 12
        }
      }
    ]
  }
]

const routers = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
routers.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果需要登录，则检查登录状态
    if (!loggedIn) {
      // 如果用户未登录，则重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 如果用户已登录，则放行
      next()
    }
  } else {
    // 如果不需要登录，则直接放行
    next()
  }
})
export default routers
