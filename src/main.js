import Vue from 'vue'
import App from './App.vue'

const evtHub = new Vue()
Vue.mixin({
  data: function () {
    return {
      evtHub: evtHub
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
