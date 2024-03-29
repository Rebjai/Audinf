import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { Service } from 'axios-middleware'
import VueAxios from 'vue-axios'
import store from './store'

const axiosInstance = axios.create({ 
  baseURL: 'http://localhost:7777/api',
  headers: {
    'Authorization': localStorage.getItem('token')
  }
})
const service = new Service(axiosInstance)

service.register({
  onResponseError(error) {
    error.response.data = JSON.parse(error.response.data)
    if(error.response.data.isLogged == false) {
      store.methods.clearUserData()
      router.push({ name: 'login' })
    }
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
})

Vue.use(VueAxios, axiosInstance)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
