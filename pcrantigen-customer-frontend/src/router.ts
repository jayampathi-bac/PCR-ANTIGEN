import { createRouter, createWebHashHistory } from 'vue-router'
import * as NProgress from 'nprogress'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

/**
 * routes are generated using vite-plugin-pages
 * each .vue files located in the ./src/pages are registered as a route
 * @see https://github.com/hannoeru/vite-plugin-pages
 */
import routes from 'pages-generated'

/**
 * Here is how a simple route is generated:
 * import { RouteRecordRaw } from 'vue-router'
 *
 * const routes: RouteRecordRaw = [{
 *    component: () => import('/src/pages/wizard-1.vue'),
 *    name: 'wizard-v1',
 *    path: '/wizard-v1',
 *    props: true,
 * }]
 *
 * Here is how nested routes are generated:
 * import { RouteRecordRaw } from 'vue-router'
 *
 * const routes: RouteRecordRaw = [{
 *    component: () => import('/src/pages/auth.vue'),
 *    path: '/auth',
 *    props: true,
 *    children: [
 *      {
 *        component: () => import('/src/pages/auth/login-1.vue'),
 *        name: 'auth-login-1',
 *        path: 'login-1',
 *        props: true,
 *      },
 *    ],
 * }]
 *
 * Uncomment the line below to view the generated routes
 */
console.log(routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

/**
 * Handle NProgress display on page changes
 */
router.beforeEach((to, from, next) => {
  const publicPages = ['/','/auth/signup-3','/auth/login-1'];
  const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');
  const loggedIn = cookies.get('user');
  NProgress.start()
  if (authRequired && !loggedIn) {
    console.log("Hi cj")
    next({ name: 'index' })
  }
  else {
    console.log("else")
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
