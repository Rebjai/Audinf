<template>
  <div id="app">

    <nav v-if="!authenticated">
      <div class="nav-item">
        <router-link to="/login">Login</router-link>
      </div>

      <div class="nav-item">
        <router-link to="/about">About</router-link>
      </div>
    </nav>

    <nav v-else>
      <div class="nav-item">
        <router-link to="/about">About</router-link>
      </div>

      <div class="nav-item">
        <router-link to="/">Home</router-link>
      </div>

      <div class="nav-item">
        <router-link to="/login" @click.native="logout()">Logout</router-link>
      </div>
    </nav>

    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view @authenticated="setAuthenticated" /> 
      </transition>
    </div>
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
      store.methods.clearUserData()
      this.authenticated = false
      this.$router.replace({ name: 'login' })
    }
  },
  created() {
    this.checkAndSetkAuthentication()
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Work+Sans');
  * {
    font-family: 'Work Sans', sans-serif;
    text-decoration: none;
    color: #e7e7e7
  }

  body {
    background-color: #111;
    margin: 0;
  }

  .content {
    display: grid;
    align-content: center;
    justify-content: center;
  }

  nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 75px));
    justify-content: right;
    text-align: center;
    overflow: hidden;
    margin-bottom: 1em;
    padding: 1em .5em .1em .5em;
  }

  .nav-item > a::after {
    content: "";
    display: block;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #e7e7e7;
    transform: scaleX(0);
    transition: all .25s;
    opacity: 0;
  }

  .nav-item > a:hover::after {
    transform: scaleX(1);
    opacity: 1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .25s;
  }

  .fade-enter {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>