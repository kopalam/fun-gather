// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Request from '@/utils/require'
import 'babel-polyfill' //ES6语法转换
import store from '@/stores/global'
// import common from '/static/common'
    
const { request, requestAll } = Request
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$token = 'eyJ1c2VyX2lkIjoxMDAsInVzZXJfYWNjb3VudCI6IjE4OTIzMDg3NDgxIiwic2Vzc2lvbiI6InNlc3MtWWhFTzYyMjUiLCJyZXFfaWQiOjE1MDg2NX0=.1552442601.ce97357514d142cd1c1dd027a581c9b9';
Vue.prototype.$request = request
Vue.prototype.$requestAll = requestAll
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
