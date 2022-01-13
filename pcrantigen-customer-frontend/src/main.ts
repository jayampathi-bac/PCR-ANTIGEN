/**
 * This is your client vue app entrypoint
 * Its loaded because it is referenced in the vite
 * entrypoint file (index.html located at the root of this project)
 *
 * External css/js files will be loaded as dependencies.
 * You may want to check the vite configuration.
 * Some plugins will register virtual components or lazyload other for us.
 *
 * @see /index.html
 * @see /vite.config.ts
 */

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import VueMultiselect from '@vueform/multiselect'
import VueSlider from '@vueform/slider'
import VueCKEditor from '@ckeditor/ckeditor5-vue'
import {socket_url} from "/@src/utils/basic_config";


import App from './App.vue'
import i18n from './i18n'
import router from './router'
// @ts-ignore
import store from './store'


import hasNestedRouterLink from './directives/has-nested-router-link'
import background from './directives/background'
import tooltip from './directives/tooltip'

/**
 * Importing external libraries allow to compile them in our bundle
 * How files are interpreted is defined by ther extension.
 */
// import 'simplebar'
import '@purge-icons/generated'
import 'nprogress/nprogress.css'
import '@vueform/multiselect/themes/default.scss'
import '@vueform/slider/themes/default.scss'
// import 'simplebar/dist/simplebar.css'
import 'tiny-slider/src/tiny-slider.scss'
import 'notyf/notyf.min.css'

import './scss/vendors/font-awesome-v5.css'
import './scss/vendors/line-icons-pro.css'
import './scss/vendors/prism-coldark-cold.css'

import './scss/main.scss'

// Now we can start our vue app
const app = createApp(App)
const head = createHead()

// import VueNativeSock from "vue-native-websocket-vue3";
// app.use(VueNativeSock,socket_url);

app.use(store);
app.use(router)
app.use(i18n)
app.use(head)
app.use(VueCKEditor)

app.component(VueMultiselect.name, VueMultiselect)
app.component(VueSlider.name, VueSlider)

app.directive('has-nested-router-link', hasNestedRouterLink)
app.directive('background', background)
app.directive('tooltip', tooltip)

app.mount('#app')
