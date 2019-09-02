import Vue from 'vue'
import Router from 'vue-router'
// import detail from '../detail.vue'
const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: { name: 'test',template:'<h1>test test test test test test</h1>'}
    // },
    {
      path: '/test',
      component: First
    }
  ]
})
