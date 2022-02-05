import { createRouter, createWebHistory } from 'vue-router'
import * as NProgress from 'nprogress'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import CheckTimeService from '/@src/service/checkTimeService';

const checkTimeService = new CheckTimeService();

/**
 * routes are generated using vite-plugin-pages
 * each .vue files located in the ./src/pages are registered as a route
 * @see https://github.com/hannoeru/vite-plugin-pages
 */
import routes from 'pages-generated'

// /**
//  * Here is how a simple route is generated:
//  * import { RouteRecordRaw } from 'vue-router'
//  *
//  * const routes: RouteRecordRaw = [{
//  *    component: () => import('/src/pages/wizard-1.vue'),
//  *    name: 'wizard-v1',
//  *    path: '/wizard-v1',
//  *    props: true,
//  * }]
//  *
//  * Here is how nested routes are generated:
//  * import { RouteRecordRaw } from 'vue-router'
//  *
//  * const routes: RouteRecordRaw = [{
//  *    component: () => import('/src/pages/auth.vue'),
//  *    path: '/auth',
//  *    props: true,
//  *    children: [
//  *      {
//  *        component: () => import('/src/pages/auth/forget.vue'),
//  *        name: 'auth-login-1',
//  *        path: 'login-1',
//  *        props: true,
//  *      },
//  *    ],
//  * }]
//  *
//  * Uncomment the line below to view the generated routes
//  */
console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * Handle NProgress display on page changes
 */
router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');
  const loggedIn = cookies.get('admintop');
  NProgress.start()
  if (authRequired && !loggedIn) {
    next({ name: 'index' })
  }
  else {
    console.log("else")
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/','/auth/forget'];
//   const authRequired = !publicPages.includes(to.path);
//   // const loggedIn = localStorage.getItem('user');
//   let checkingLoginAndTime = cookies.isKey("admin2") ? checkTimeService.checkTimeDuration() : false
//   // const loggedIn = cookies.get('admin2') && checking;
//   NProgress.start()
//   console.log("checkTimeDuration",checkTimeService.checkTimeDuration())
//   if (authRequired && !checkingLoginAndTime) {
//     console.log("Hi cj")
//     next({ name: 'index' })
//   }
//   else {
//     console.log("else")
//     next()
//   }
// })



router.afterEach(() => {
  NProgress.done()
})

export default router
