<template>
  <div id="app">
    <nav>
      <router-link to="/login">Login</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login" @click.native="logout()" v-if="authenticated">logout</router-link>
    </nav>
    <router-view @authenticated="setAuthenticated" /> 
  </div>
</template>

<script>
import router from './router'
import store from './store'


router.beforeEach((to, from, next) => {
  console.log(`${from.name} => ${to.name}`)

  if(!store.methods.isLogged() && ['login', 'about'].some((v) => { return v == to.name })) {
    next()
  }
  else if(store.methods.isLogged() && ['login', 'register', null].some((v) => { return v == to.name })) {
    router.replace({ name: 'home' })
  }
  else if(store.methods.isLogged()) {
    next()
  }
  else {
    router.replace({ name: 'login' })
  }
})

export default {
  name: 'App',
  data() {
    return {
      authenticated: false
    }
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('token') !== null ? true : false
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status
    },
    checkAndSetkAuthentication() {
      this.authenticated = localStorage.getItem('token') !== null ? true : false
    },
    logout() {
      localStorage.removeItem('token')
      this.authenticated = false
      this.$router.replace({ name: 'login' })
    }
  },
  created() {
    this.checkAndSetkAuthentication()
  }
}
</script>

<style lang="">
  
</style>