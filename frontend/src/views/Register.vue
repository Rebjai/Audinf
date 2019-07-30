<template>
  <div id="register">
    <!-- select user type -->
    <label>Registrar:</label>
    <select name="userType" id="userType" v-model="userType">
      <option value="student">Estudiante</option>
      <option value="teacher">Docente</option>
      <option value="device">Equipo</option>
      <option value="support">Soporte</option>
      <option value="group">Grupo</option>
      <option value="support"></option>
    </select>
    <!-- estudiante -->
    <div v-show="userType == 'student'" @keyup.enter="register" id="register-student">
      <label>Número de Control*:</label>
      <input type="text" v-model="user.username" />

      <label>Contraseña*:</label>
      <input type="password" v-model="user.password" />

      <label>Confirmar Contraseña*:</label>
      <input type="password" v-model="user.passwordConfirmation" />

      <label>Nombre:</label>
      <input type="text" v-model="user.name" />

      <label>semestre:</label>
      <input type="number" value="1" min="1" max="8" v-model="user.semester" />

      <button @click="register">Registrarse</button>
      <div class="errors">
        <ul>
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div>
    </div>
    <!-- maestro -->
    <div v-show="userType == 'teacher'" id="register-teacher">
      maistro:
      <label>Número de Control*:</label>
      <input type="text" v-model="teacher.username" />

      <label>Contraseña*:</label>
      <input type="password" v-model="teacher.password" />

      <label>Confirmar Contraseña*:</label>
      <input type="password" v-model="teacher.passwordConfirmation" />

      <label>Nombre:</label>
      <input type="text" v-model="teacher.name" />
      <button @click="registerTeacher">Registrarse</button>
      <div class="errors">
        <ul>
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div>
    </div>

    <!-- equipo -->
    <div v-show="userType == 'device'" id="register-device">
      Equipo:
      <br />
      <label>I.P. del equipo:</label>
      <input type="text" v-model="device.ip" @click.prevent="setClientIP" @keydown.prevent />

      <label>nombre:</label>
      <input type="name" v-model="device.name" />

      <label>sala:</label>
      <input type="text" v-model="device.room" />
      <button @click="registerSupport">Registrarse</button>
      <div class="errors">
        <ul>
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div>
    </div>
    <!-- mantenimiento -->
    <div v-show="userType == 'support'" id="register-device">
      Support:
      <br />
      <label>Nombre:</label>
      <input type="text" v-model="support.name" @click.prevent="setClientIP" @keydown.prevent />

      <label>Contraseña:</label>
      <input type="text" v-model="support.password" />

      <label>id:</label>
      <input type="text" v-model="support.ID" />
      <button @click="registerSupport">Registrarse</button>
      <div class="errors">
        <ul>
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div>
    </div>
    <div v-show="userType == 'group'" id="register-group">
      group:
      <br />
      <label>Nombre:</label>
      <input type="text" v-model="group.name" />

      <label>semestre:</label>
      <input type="number" v-model="group.semester" />

      <label>area:</label>
      <input type="text" v-model="group.area" />
      <button @click="registerGroup">Registrarse</button>
      <div class="errors">
        <ul>
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import getUserIP from "../utils/getClientIP";

export default {
  data() {
    return {
      errors: [],
      success: false,
      userType: "student",
      user: {
        username: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        semester: 1
      },
      teacher: {
        username: "",
        password: "",
        passwordConfirmation: "",
        name: ""
      },
      device: {
        ip: "",
        name: "",
        room: ""
      },
      support: {
        password: "",
        name: "",
        ID: ""
      },
      group: {
        semester: 1,
        name: "",
        ID: ""
      }
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
    register() {
      this.errors = [];
      this.success = false;
      if (
        this.user.username == "" &&
        this.user.password == "" &&
        this.user.passwordConfirmation == ""
      ) {
        this.errors.push("Wypełnij pola.");
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
            semester: this.user.semester
          })
          .then(result => {
            this.success = true;
            this.user.username = "";
            this.user.password = "";
            this.user.passwordConfirmation = "";
            this.user.name = "";
            this.user.semester = 1;
            setTimeout(() => {
              this.success = false;
            }, 1500);
          })
          .catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    },
    registerTeacher() {
      this.errors = [];
      this.success = false;
      if (
        this.teacher.username == "" &&
        this.teacher.password == "" &&
        this.teacher.passwordConfirmation == ""
      ) {
        this.errors.push("ingresa la contraseña");
      } else {
        if (
          this.teacher.username.trim().length < 8 ||
          this.teacher.username.trim().length > 8
        )
          this.errors.push("El número de control debe tener 8 números");
        if (
          this.teacher.password.length < 4 ||
          this.teacher.password.length > 4
        )
          this.errors.push("La contraseña debe de ser de 4 caracteres");
        if (this.teacher.password !== this.teacher.passwordConfirmation)
          this.errors.push("Las contraseñas deben coincidir");
      }
      if (!this.errors.length) {
        Vue.axios
          .post("/teacher/register", {
            username: this.teacher.username,
            password: this.teacher.password,
            passwordConfirmation: this.teacher.passwordConfirmation,
            name: this.teacher.name
          })
          .then(result => {
            this.success = true;
            this.teacher.username = "";
            this.teacher.password = "";
            this.teacher.passwordConfirmation = "";
            this.teacher.name = "";
            setTimeout(() => {
              this.success = false;
            }, 1500);
          })
          .catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    },
    registerSupport() {
      this.errors = [];
      this.success = false;
      if (
        this.support.username == "" &&
        this.support.password == "" &&
        this.support.passwordConfirmation == ""
      ) {
        this.errors.push("Wypełnij pola.");
      } else {
        if (
          this.support.username.trim().length < 8 ||
          this.support.username.trim().length > 8
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
            username: this.support.username,
            password: this.support.password,
            passwordConfirmation: this.support.passwordConfirmation,
            name: this.support.name,
            semester: this.support.semester
          })
          .then(result => {
            this.success = true;
            this.support.username = "";
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
    },
    registerGroup() {
      this.errors = [];
      this.success = false;
      if (
        this.group.name == "" &&
        this.group.semester == "" &&
        this.group.area == ""
      ) {
        this.errors.push("Rellena Los campos");
      } else {
        if (
          this.group.name.trim().length < 1 ||
          this.group.name.trim().length > 4
        )
          this.errors.push("El nombre del grupo debe tener entre 1 y 4 caracteres");
        if (
          this.group.semester < 1 ||
          this.group.semester > 10
        )
          {this.errors.push("el semestre debe ser mayo de 1 y menor de 10")}
        if (this.group.area == "")
          this.errors.push("ingresa area");
      }
      if (!this.errors.length) {
        Vue.axios
          .post("/group/register", {
            name: this.group.name.toUpperCase(),
            semester: this.group.semester,
            area: this.group.area
          })
          .then(result => {
            this.success = true;
            this.group.name = "";
            this.group.semester = 1;
            this.group.area = "";
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
/* #register {
  display: grid;
  background-color: #222;
  border-radius: 5px;
  grid-gap: 5px;
  padding: 10px;
  margin: 5px;
}
#register > input,
button {
  border: solid #e7e7e7 1px;
  background: transparent;
  border-radius: 10rem;
  outline: none;
}
#register > input,
select {
  font-size: 1.25em;
  padding: 5px 0 5px 10px;
}
#register > button {
  text-align: center;
  margin-top: 10px;
  width: auto;
  padding: 0.45em 0.75em;
  font-size: 1.05em;
  justify-self: right;
}
#register ul {
  list-style-type: none;
  padding: 10px;
  margin: 0;
}
#register ul * {
  color: red;
}
#register ul li {
  margin-top: 15px;
}
#register ul li:first-child {
  margin-top: 0;
}
#register span {
  color: rgb(46, 204, 46);
}
#register select {
  border: solid #e7e7e7 1px;
  background: transparent;
  border-radius: 10rem;
  outline: none;
}
select > option {
  border: solid #e7e7e7 1px;
  background: black;
  border-radius: 10rem;
  outline: none;
}

@media screen and (min-width: 800px) {
  #register {
    width: 400px;
  }
} */
</style>