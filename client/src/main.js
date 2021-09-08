// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'//บท9
import store from './store'//บท9
import VueResource from 'vue-resource'

import BackHeader from '@/components/Header.vue' //ลิ้งไฟล์ Header ให้ไปแสดงทุกหน้าได้จากที่นี่
Vue.component('back-header', BackHeader)

Vue.config.productionTip = false

Vue.use(VueResource)

sync(store, router)//บท9

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})