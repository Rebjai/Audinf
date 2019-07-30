<template>
  <div id="app columns is-vcentered">
    <nav v-if="!authenticated" class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: Free, open source, & modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong><router-link to="/login">Acceso</router-link></strong>
            </a>
            <a class="button is-light"><router-link to="/register">Registro</router-link></a>
          </div>
        </div>
      </div>
    </nav>

    <!-- <nav v-if="!authenticated">
      <router-link to="/login">Acceso</router-link>
      <router-link to="/register">Registro</router-link>
    </nav> -->

    <nav v-else>
      <router-link to="/">Comentarios / observaciones</router-link>
      <router-link to="/login" @click.native="logout()">Salir</router-link>
    </nav>

    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view @authenticated="setAuthenticated" />
      </transition>
    </div>
  </div>
</template>

<script>
import router from "./router";
import store from "./store";
import Vue from "vue"

router.beforeEach((to, from, next) => {
  //if not logged can only see login/register views
  if (
    !store.methods.isLogged() &&
    ["login", "register"].some(v => {
      return v == to.name;
    })
  ) {
    next();
  }

  //will move to home if logged in will want to view login / register / null views

  else if (
    store.methods.isLogged() &&
    ["login", "register", null].some(v => {
      return v == to.name;
    })
  ) {
    router.replace({ name: from.name });
  }

  //przenosi zalogowanego
  else if (store.methods.isLogged()) {
    next();
  }

  //przenosi do logowania jezeli zaden z warunkow nie zostal spelniony
  else {
    router.replace({ name: "login" });
  }
});

export default {
  name: "App",
  data() {
    return {
      authenticated: false
    };
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem("token") !== null ? true : false;
    }
  },
  methods: {
    
    setAuthenticated(status) {
      this.authenticated = status;
    },
    checkAndSetkAuthentication() {
      this.authenticated =
        localStorage.getItem("token") !== null ? true : false;
    },
    logout() {
      // TODO
      //send logged out tokken
      Vue.axios
        .put("/log/logout", {
          username: this.username,
          password: this.password,
          deviceIP: localStorage.getItem("IP"),
          logID: localStorage.getItem("logID")
        })
        .then(result => {
          console.log(result.data);
        })
      store.methods.clearUserData();
      this.authenticated = false;
      this.$router.replace({ name: "login" });
    }
  },
  created() {
    this.checkAndSetkAuthentication();
  },
  updated() {
    this.checkAndSetkAuthentication();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Work+Sans");
@import url("~bulma/css/bulma.css");
body {
  height: 100vh;
}
#app {
  height: 100%;
  background: #000;
}
* {
  font-family: "Work Sans", sans-serif;
  /* text-decoration: none;
    color: #e7e7e7 */
}

/* body {
    background-color: #111;
    margin: 0;
    padding: 0;
  }

  nav {
    position: sticky;
    left: 0;
    top: 0;
    background-color: rgba(17, 17, 17, 0.75);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, auto));
    grid-gap: 12px;
    justify-content: right;
    text-align: center;
    margin-bottom: 1em;
    padding: 10px 20px;
  }

   a::after {
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

   a:hover::after {
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

  .content {
    display: grid;
  }
  @media screen and (min-width: 825px) {
    .content > * {
      justify-self: center;
      width: 800px;
    }
    nav {
      max-width: 1200px;
      margin: 0 auto;
    }
  } */
</style>