<template>
  <div class="box">
    <div @keyup.enter="register" id="component-register-user">
      <div class="errors">
        <ul>
          <p v-for="(error, index) of errors" :key="index" class="help is-danger">{{error}}</p>
          <!-- <li >{{ error }}</li> -->
        </ul>
        <span v-if="success" class="help is-success">Registro Exitoso</span>
      </div>
      <div class="field">
        <label class="label">Número de control:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="12345678" v-model="user.username" />
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
      </div>
      <div class="field">
        <label class="label">Contraseña:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="1234" v-model="user.password" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <!-- <p class="help is-success">contraseña</p> -->
      </div>
      <div class="field">
        <label class="label">Confirmar contraseña:</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="password"
            placeholder="1234"
            v-model="user.passwordConfirmation"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
      </div>
      <div class="field">
        <label class="label">Nombre:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Nombre" v-model="user.name" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
      </div>
      <div class="field">
        <label class="label">Carrera:</label>
        <div class="control">
          <div class="select">
            <select name="userType" id="select-user" v-model="user.area">
              <option value="AGRONOMÍA">AGRONOMÍA</option>
              <option value="BIOLOGÍA">BIOLOGÍA</option>
              <option value="FORESTAL">FORESTAL</option>
              <option value="INFORMÁTICA">INFORMÁTICA</option>
              <option value="TICS">T.I.C.S.</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">semestre:</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="number"
            value="1"
            min="1"
            max="8"
            placeholder="Nombre"
            v-model="user.semester"
          />
          <span class="icon is-small is-left">
            <i class="fas fa fa-id-card-o"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "regUser",
  data: () => {
    return {
      errors: [],
      success: false,
      user: {
        username: "",
        area: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        semester: 1
      }
    };
  },
  methods: {
    register() {
      this.errors = [];
      this.success = false;
      if (
        this.user.username == "" &&
        this.user.password == "" &&
        this.user.passwordConfirmation == "" ||
        this.user.area == ""
      ) {
        this.errors.push("introduce todos los datos obligatorios");
      } else {
        if (
          this.user.username.trim().length < 8 ||
          this.user.username.trim().length > 8
        )
          this.errors.push("El número de control debe tener 8 números");
        if (this.user.password.length < 4 || this.user.password.length > 4)
          this.errors.push("La contraseña debe de ser de 4 caracteres");
        if (this.user.password !== this.user.passwordConfirmation)
          this.errors.push("Las contraseñas deben coincidir");
      }
      if (!this.errors.length) {
        Vue.axios
          .post("/user/register", {
            username: this.user.username,
            password: this.user.password,
            passwordConfirmation: this.user.passwordConfirmation,
            name: this.user.name,
            semester: this.user.semester,
            area: this.user.area
          })
          .then(result => {
            this.success = true;
            this.user.username = "";
            this.user.password = "";
            this.user.passwordConfirmation = "";
            this.user.area = "";
            this.user.name = "";
            this.user.semester = 1;
            setTimeout(() => {
              this.success = false;
            }, 3500);
          })
          .catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    }
  }
};
</script>

<style>
</style>
