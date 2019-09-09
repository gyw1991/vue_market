import Vue from 'vue'
import App from './App.vue'
import './style/common.less'
import router from './router/router'
import VueLazyload from 'vue-lazyload'
import store from './store/store'
Vue.use(VueLazyload)
// 1.fastclick
// import FastClick from 'fastclick'
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function () {
//     FastClick.attach(document.body)
//   }, false)
// }
// 2.vant组件库
import './plugins/vant/vant'
// 3.rem设置
import './config/rem'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
