<template>
  <div class="box">
    <div @keyup.enter="registerDevice" id="component-register-device">
      <div class="errors">
        <ul>
          <p v-for="(error, index) of errors" :key="index" class="help is-danger">{{error}}</p>
          <!-- <li >{{ error }}</li> -->
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div>
      <div class="field">
        <label class="label">I.P. del equipo:</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="12345678"
            v-model="device.ip"
            @click.prevent="setClientIP"
            @keydown.prevent
          />
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
        <label class="label">sala:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="number" placeholder="1234" v-model="device.room" />
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
        <label class="label">Nombre:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Nombre" v-model="device.name" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
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
import getUserIP from "../../utils/getClientIP";
import Vue from "vue";
export default {
  name: "regDevice",
  data: () => {
    return {
      errors: [],
      success: false,
      device: {
        ip: "",
        name: "",
        room: ""
      }
      // user: {
      //   username: "",
      //   area: "",
      //   password: "",
      //   passwordConfirmation: "",
      //   name: "",
      //   semester: 1
      // }
    };
  },
  methods: {
    setClientIP() {
      console.log("getting ip");

      let self = this;
      getUserIP(function(ip) {
        // Usage
        console.log("Got IP! :" + ip);
        self.device.ip = ip;
      });
    },
    registerDevice() {
      this.errors = [];
      this.success = false;
      if (
        this.device.ip == "" ||
        this.device.name == "" ||
        this.device.room == ""
      ) {
        this.errors.push("ingresa todos los datos obligatorios");
      } else {
        if (
          this.device.name.trim().length < 2 ||
          this.device.name.trim().length > 15
        )
          this.errors.push("El nombre debe tener entre 2 y 15 caracteres");
        if (this.device.ip.length < 8 || this.device.ip.length > 24)
          this.errors.push("mal IP");
        // if (this.device.ip !== this.device.ipConfirmation)
        //   this.errors.push("Las contraseñas deben coincidir");
      }
      if (!this.errors.length) {
        Vue.axios
          .post("/device/register", {
            name: this.device.name,
            ip: this.device.ip,
            // passwordConfirmation: this.device.ipConfirmation,
            room: this.device.room
          })
          .then(result => {
            this.success = true;
            this.device.name = "";
            this.device.ip = "";
            // this.device.ipConfirmation = "";
            this.device.room= 1;
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
