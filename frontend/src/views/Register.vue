<template>
  <div id="register" class="container box">
    <!-- select user type -->
    <!-- <div class="form">
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
        <p class="help is-success">This username is available</p>
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
        <p class="help is-success">This username is available</p>
      </div>
      <div class="field">
        <label class="label">Registrar:</label>
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
        <p class="help is-success">This username is available</p>
      </div>
    </div> -->
    <div class="field">
      <label class="label">Registrar:</label>
      <div class="control">
        <div class="select">
          <select name="userType" id="select-user" v-model="userType">
            <option value="student">Estudiante</option>
            <option value="teacher">Docente</option>
            <option value="device">Equipo</option>
            <option value="support">Soporte</option>
            <option value="group">Grupo</option>
          </select>
        </div>
      </div>
    </div>
    <!-- form base -->

    <!-- estudiante -->
    <div class v-show="userType == 'student'"  id="register-student">
      <!-- <label>Número de Control*:</label>
      <input type="text" v-model="user.username" />

      <label>Contraseña*:</label>
      <input type="password" v-model="user.password" />

      <label>Confirmar Contraseña*:</label>
      <input type="password" v-model="user.passwordConfirmation" />

      <label>Nombre:</label>
      <input type="text" v-model="user.name" />

      <label>Area:</label>
      <input type="text" v-model="user.area" />

      <label>semestre:</label>
      <input type="number" value="1" min="1" max="8" v-model="user.semester" />

      <button @click="register">Registrarse</button>
      <div class="errors">
        <ul>
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div> -->
      <regUser />
    </div>
    <!-- maestro -->
    <div v-show="userType == 'teacher'" id="register-teacher">
      <!-- maistro:
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
      </div> -->
      <regTeacher/>
    </div>

    <!-- equipo -->
    <div v-show="userType == 'device'" id="register-device">
      <!-- Equipo:
      <br />
      <label>I.P. del equipo:</label>
      <input type="text" v-model="device.ip" @click.prevent="setClientIP" @keydown.prevent />

      <label>nombre:</label>
      <input type="name" v-model="device.name" />

      <label>sala:</label>
      <input type="text" v-model="device.room" />
      <button @click="registerDevice">Registrarse</button>
      <div class="errors">
        <ul>
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div> -->
      <regDevice/>
    </div>
    <!-- mantenimiento -->
    <div v-show="userType == 'support'" id="register-support">
      <!-- Support:
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
      </div> -->
      <regSupport/>
    </div>
    <!-- group -->
    <div v-show="userType == 'group'"  id="register-group">
      <!-- group:
      <br />
      <label>Nombre:</label>
      <input type="text" v-model="group.name" />

      <label>semestre:</label>
      <input type="number" v-model="group.semester" />

      <label>area:</label>
      <input type="text" v-model="group.area" />
      <button @click.prevent="registerGroup">Registrarse</button>
      <div class="errors">
        <ul>
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
        <span v-if="success">Registro Exitoso</span>
      </div> -->
      <regGroup/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import getUserIP from "../utils/getClientIP";
import regUser from "./registers/RegUser";
import regTeacher from "./registers/RegTeacher";
import regSupport from "./registers/RegSupport";
import regGroup from "./registers/RegGroup";
import regDevice from "./registers/RegDevice";

export default {
  components: {
    regUser: regUser,
    regTeacher: regTeacher,
    regSupport: regSupport,
    regGroup: regGroup,
    regDevice: regDevice
  },
  data() {
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
      },
      userType: "student",
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
};
</script>

<style>

</style>