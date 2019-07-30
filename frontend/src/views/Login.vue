<template>
  <div @keyup.enter="login" id="login" class="container">
    <div class="box">
      <div class="field">
        <label class="label">Soy un:</label>
        <div class="control">
          <div class="select">
            <select name="userType" id="select-user" v-model="userType">
              <option value="0">Estudiante</option>
              <option value="1">Docente</option>
              <option value="2">Soporte</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Número de control:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="12345678" v-model="username" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field">
        <label class="label">Contraseña</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-danger"
            type="password"
            v-model="password"
            placeholder="Contraseña"
            value="password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="login">Entrar</button>
        </div>
      </div>
    </div>
    
      <!-- <div class="control">
        <button class="button is-text">Cancel</button>
      </div>-->
    
    <select name="userType" id="select-user" v-model="userType">
      <option value="0">Estudiante</option>
      <option value="1">Docente</option>
      <option value="2">Soporte</option>
    </select>

    <label>Número de control:</label>
    <input type="text" v-model="username" />

    <label>Contraseña:</label>
    <input type="password" v-model="password" />

    <button @click="login" class="l-button">Entrar</button>
    <div class="errors">
      <ul>
        <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import getClientIP from "../utils/getClientIP";

export default {
  data() {
    return {
      username: "",
      password: "",
      userType: 0,
      errors: []
    };
  },
  methods: {
    setClientIP(){
      console.log("setting ip");

      let self = this;
      getClientIP(function(ip) {
        // Usage
        console.log("Got IP! :" + ip);
        localStorage.setItem("IP", ip)
        
      });
    },
    login() {
      this.errors = [];
      if (this.username == "" || this.password == "") {
        this.errors.push("Ingresa tus datos, por favor");
      } else {
        this.userType == 0
          ? this.logUser()
          : this.userType == 1
          ? this.logTeacher()
          : this.logSupport();
      }
    },
    logUser() {
      Vue.axios
        .post("/user/login", {
          username: this.username,
          password: this.password,
          deviceIP: localStorage.getItem("IP")
        })
        .then(result => {
          console.log(result.data);
          

          localStorage.setItem("token", result.data.token);
          localStorage.setItem("username", this.username);
          localStorage.setItem("name", result.data.name);
          localStorage.setItem("semester", result.data.semester);
          localStorage.setItem("ID", result.data.id);
          localStorage.setItem("logID", result.data.logID);
          Vue.axios.defaults.headers.Authorization = localStorage.getItem(
            "token"
          );
          this.username = "";
          this.password = "";
          this.$router.push({ name: "home" });
          this.$emit("authenticated", true);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
        this.setClientIP()
    },
    
    logTeacher() {
      Vue.axios
        .post("/teacher/login", {
          username: this.username,
          password: this.password
        })
        .then(result => {
          console.log(result.data);

          localStorage.setItem("token", result.data.token);
          localStorage.setItem("username", this.username);
          localStorage.setItem("name", result.data.name);
          localStorage.setItem("semester", result.data.semester);
          Vue.axios.defaults.headers.Authorization = localStorage.getItem(
            "token"
          );
          this.username = "";
          this.password = "";
          this.$router.push({ name: "thome" });
          this.$emit("authenticated", true);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    logSupport() {
      Vue.axios
        .post("/support/login", {
          username: this.username,
          password: this.password
        })
        .then(result => {
          console.log(result.data);

          localStorage.setItem("token", result.data.token);
          localStorage.setItem("username", this.username);
          localStorage.setItem("name", result.data.name);
          localStorage.setItem("semester", result.data.semester);
          Vue.axios.defaults.headers.Authorization = localStorage.getItem(
            "token"
          );
          this.username = "";
          this.password = "";
          this.$router.push({ name: "shome" });
          this.$emit("authenticated", true);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<style>
</style>