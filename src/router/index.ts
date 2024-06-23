import Layout from "../layout/index.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { loadDataFromStorage } from "../utils/util";
import { createDiscreteApi } from 'naive-ui'
const { loadingBar } = createDiscreteApi(['loadingBar'])

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "index",
    meta: {
      title: "登录",
      hasAuth: false
    },
    component: () => import('../pages/login/login.vue'),
  },
  {
    path: "/",
    name: "dashboard",
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../pages/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: "仪表盘",
          hasAuth: true
        }
      }
    ]
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   name: "MainLayout",
  //   meta: {
  //     title: "主页",
  //   },
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('../pages/dashboard/index.vue'),
  //       name: 'Dashboard'
  //     }
  //   ]
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('from', from);
  const isAuthenticated = !!loadDataFromStorage('token'); // 这里使用一个简单的本地存储标志来表示是否已认证
  if (isAuthenticated && to.path === '/login') {
    // 如果已登录且试图访问登录页面，则重定向到首页
    loadingBar.start()
    next({ path: '/' });
  } else if (to.matched.some(record => record.meta.hasAuth) && !isAuthenticated) {
    loadingBar.start()
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    loadingBar.start()
    next();
  }
});

router.afterEach(() => {
  loadingBar.finish()
});

export default router;