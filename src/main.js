// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import detail from './detail'
// import router from './router'
import Promise from 'promise-polyfill'
import VueRouter from 'vue-router'
const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/first',
      component: First
    }
  ]
})
// To add to window
if (!window.Promise) {
    window.Promise = Promise
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  render: h => h(App)
})
