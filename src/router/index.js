import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
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
          index: 1
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
          index: 6
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
          index: 10
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
export default routers
