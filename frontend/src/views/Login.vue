<template>
  <div @keyup.enter="login" id="login">
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
    login() {
      this.errors = [];
      if (this.username == "" || this.password == "") {
        this.errors.push("Ingresa tus datos, por favor");
      }else{
      this.userType == 0 ? this.logUser() : this.userType == 1 ? this.logTeacher() : this.logSupport()

      }
    },
    logUser() {
      Vue.axios
        .post("/user/login", {
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
          this.$router.push({ name: "home" });
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
#login {
  display: grid;
  background-color: #222;
  border-radius: 5px;
  grid-gap: 5px;
  padding: 10px;
  margin: 5px;
}
#login > input,
button {
  border: solid #e7e7e7 1px;
  background: transparent;
  border-radius: 10rem;
  outline: none;
}
#login > input {
  font-size: 1.25em;
  padding: 5px 0 5px 10px;
}
#login > button {
  text-align: center;
  margin-top: 10px;
  width: auto;
  padding: 0.45em 0.75em;
  font-size: 1.05em;
  justify-self: right;
}
#login ul {
  list-style-type: none;
  padding: 10px;
  margin: 0;
}
#login ul li {
  margin-top: 15px;
}
#login ul li:first-child {
  margin-top: 0;
}

@media screen and (min-width: 800px) {
  #login {
    width: 400px;
  }
}
</style>