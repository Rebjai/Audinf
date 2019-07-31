<template>
  <div class="box">
    <div @keyup.enter="registerGroup" id="component-register-group">
      <div class="errors">
        <ul>
          <p v-for="(error, index) of errors" :key="index" class="help is-danger">{{error}}</p>
          <!-- <li >{{ error }}</li> -->
        </ul>
        <span v-if="success" class="help is-success">Registro Exitoso</span>
      </div>
      <div class="field">
        <label class="label">Carrera:</label>
        <div class="control has-icons-left has-icons-right">
          <div class="select">
            <select name="userType" id="select-user" placeholder="INFORMÁTICA" v-model="group.area">
              <option value="AGRONOMÍA">AGRONOMÍA</option>
              <option value="BIOLOGÍA">BIOLOGÍA</option>
              <option value="FORESTAL">FORESTAL</option>
              <option value="INFORMÁTICA">INFORMÁTICA</option>
              <option value="TICS">T.I.C.S.</option>
            </select>
          </div>
          <span class="icon is-small is-left">
            <i class="fas fa-home"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>
      

      <div class="field">
        <label class="label">Nombre:</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Nombre" v-model="group.name" />
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
        <label class="label">semestre:</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="number"
            value="1"
            min="1"
            max="8"
            placeholder="Nombre"
            v-model="group.semester"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-calendar"></i>
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
  name: "regGroup",
  data: () => {
    return {
      errors: [],
      success: false,
      group: {
        name: "",
        area: "",
        semester: 1
      }
    };
  },
  methods: {
    registerGroup() {
      console.log("regging group");
      let data = {
        name: this.group.name.toUpperCase(),
        semester: this.group.semester,
        area: this.group.area
      };
      console.log(data);

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
          this.errors.push(
            "El nombre del grupo debe tener entre 1 y 4 caracteres"
          );
        if (this.group.semester < 1 || this.group.semester > 10) {
          this.errors.push("el semestre debe ser mayo de 1 y menor de 10");
        }
        if (this.group.area == "") this.errors.push("ingresa area");
      }
      if (!this.errors.length) {
        Vue.axios
          .post("/group/register", data)
          .then(result => {
            console.log(result);

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
    },
  }
};
</script>

<style>
</style>
