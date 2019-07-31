<template>
  <div class="box">
    <div @keyup.enter="registerSupport" id="component-register-support">
      <div class="errors">
        <ul>
          <p v-for="(error, index) of errors" :key="index" class="help is-danger">{{error}}</p>
          <!-- <li >{{ error }}</li> -->
        </ul>
        <span v-if="success" class="help is-success">Registro Exitoso</span>
      </div>
      <div class="field">
        Support:
        <label class="label">Número de control:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="12345678" v-model="support.ID" />
          <span class="icon is-small is-left">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username ç is available</p> -->
      </div>
      <div class="field">
        <label class="label">Contraseña:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="1234" v-model="support.password" />
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
            v-model="support.passwordConfirmation"
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
          <input class="input" type="text" placeholder="Nombre" v-model="support.name" />
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
        <label class="label">Área:</label>
        <div class="control">
          <div class="select">
            <select name="userType" id="select-user" v-model="support.area">
              <option value="SOFTWARE">SOFTWARE</option>
              <option value="REDES">REDES</option>
              <option value="HARDWARE">HARDWARE</option>
              <option value="SEGURIDAD">SEGURIDAD</option>
              <!-- <option value="TICS">T.I.C.S.</option> -->
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "regSupport",
  data: () => {
    return {
      errors: [],
      success: false,
      support: {
        ID: "",
        area: "",
        password: "",
        passwordConfirmation: "",
        name: ""
        // semester: 1
      }
    };
  },
  methods:{
    registerSupport() {
      console.log("regging sup");
      
      this.errors = [];
      this.success = false;
      if (
        this.support.ID == "" ||
        this.support.password == "" ||
        this.support.passwordConfirmation == "" ||
        this.support.name == ""
      ) {
        this.errors.push("Ingresa los datos obligatorios.");
      } else {
        if (
          this.support.ID.trim().length < 8 ||
          this.support.ID.trim().length > 8
        )
          this.errors.push("El número de control debe tener 8 números");
        if (
          this.support.password.length < 4 ||
          this.support.password.length > 4
        )
          this.errors.push("La contraseña debe de ser de 4 caracteres");
        if (this.support.password !== this.support.passwordConfirmation)
          this.errors.push("Las contraseñas deben coincidir");
      }
      if (!this.errors.length) {
        Vue.axios
          .post("/support/register", {
            username: this.support.ID,
            password: this.support.password,
            passwordConfirmation: this.support.passwordConfirmation,
            name: this.support.name,
            semester: this.support.semester
          })
          .then(result => {
            this.success = true;
            this.support.ID = "";
            this.support.password = "";
            this.support.passwordConfirmation = "";
            this.support.name = "";
            this.support.semester = 1;
            setTimeout(() => {
              this.success = false;
            }, 1500);
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
