<template>
  <div id="home" class="container">
    <div class="columns is-multiline">
      <div class="column">
        <span>
          IP del equipo:
          <span class="username">{{ ip }}</span>
        </span>
      </div>
      <!-- <div class="column">
        <span>
          semestre:
          <span class="username">{{ semester }}</span>
        </span>
      </div>-->
      <div class="column">
        <span>
          Nombre:
          <span class="username">{{ name }}</span>
        </span>
      </div>
      <div class="column">
        <span>
          N. control:
          <span class="username">{{ username }}</span>
        </span>
      </div>

      <!-- <div class="column"></div>
      <div class="column"></div>-->
    </div>
    <div class="box">
      <!-- <div class>
        <div class>
          <label for>Ingrese el grupo:</label>
          <div class="select is-info">
            <select v-model="log.group">
              <option v-for="grp in groups" :key="grp.id" :value="grp.name">{{grp.name}}</option>
            </select>
          </div>
        </div>
      </div> -->
      <div class>
        <div class>
          <label for>seleccione el equipo</label>
          <div class="select is-info">
            <select v-model="device">
              <option
                v-for="dev in devices"
                :key="dev.id"
                :value="dev.name"
              >{{device.name}}</option>
            </select>
          </div>
        </div>
        <div class="select is-info">
            <select v-model="device">
              <option>bueno</option>
              <option>regular</option>
              <option>malo</option>
            </select>
          </div>

      </div>
      <!-- <a class="button is-link" @click="goContinue"  >Enviar</a> -->
    </div>
    <div class="container has-text-centered">
      <div v-for="log in logs" :key="log.id" class="box">
        <div class="columns">
          <div class="column">{{log.createdAt}}</div>
          <div class="column">{{log.endDate}}</div>
          <div class="column">{{log.stack}}</div>
          <div class="column">{{log.username}}</div>
          <div class="column">{{log.id}}</div>
        </div>
        <!-- {{log.id}} -->
        <!-- <div class>
          <div class>
            <label for>Ingrese el grupo:</label>
            <div class="select is-info">
              <select v-model="log.group">
                <option v-for="grp in groups" :key="grp.id" :value="grp.name">{{grp.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class>
          <div class>
            <label for>seleccione la materia</label>
            <div class="select is-info">
              <select v-model="log.teacher">
                <option v-for="tchr in teachers" :key="tchr.id" :value="tchr.name">{{tchr.name}}</option>
              </select>
            </div>
          </div>
        </div>-->
        <!-- <a class="button is-link" @click="goContinue">Enviar</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import TaskComponent from "../components/Task.vue";

export default {
  components: {
    "task-component": TaskComponent
  },
  data() {
    return {
      ip: "0.0.0.0",
      username: "",
      name: "",
      device: "",
      logs: [],
      devices: [],
      newTask: {
        name: "",
        term: ""
      },
      errors: [],
      loading: true,
      tasks: []
    };
  },
  methods: {
    getDevices() {
      console.log("getting devices");
      
      Vue.axios
        .get('devices/')
        .then(result => {
          this.devices = result.data.devices;
          this.loading = false;
          console.log("logs", result.data.devices);
        })
        .catch(error => {
          console.log(error);

          //todo: zrobisz wyswietlanie errorow
        });
    },
    getLogs() {
      Vue.axios
        .get(`log/`)
        .then(result => {
          this.logs = result.data.logs;
          this.loading = false;
          console.log("logs", result.data.logs);
        })
        .catch(error => {
          console.log(error);

          //todo: zrobisz wyswietlanie errorow
        });
    },
    deleteTask(id) {
      this.tasks.filter((v, i) => {
        if (v._id == id) {
          Vue.axios
            .delete(`task/${id}`)
            .then(result => {
              this.tasks.splice(i, 1);
            })
            .catch(err => {
              //todo: zrobic wyswietlanie errorow
            });
        }
      });
    },
    createTask() {
      this.errors = [];
      if (this.newTask.name.trim() == "") {
        this.errors.push("No puedo hacer una tarea vacía");
      } else {
        Vue.axios
          .post("/task", {
            name: this.newTask.name,
            term: this.newTask.term
          })
          .then(result => {
            this.tasks.unshift(result.data.task);
            this.newTask = {
              name: "",
              term: ""
            };
          })
          .catch(error => {
            this.errors = [];
            this.errors = error.response.data.errors;
          });
      }
    },
    setUsernameFromToken() {
      this.username = localStorage.getItem("username");
      this.name = localStorage.getItem("name");
    }
  },
  created() {
    this.getLogs();
    this.getDevices();
    this.setUsernameFromToken(),
      //Pobieranie zadan z bazy danych
      Vue.axios
        .get("/task")
        .then(result => {
          this.tasks = result.data.tasks;
          this.loading = false;
        })
        .catch(error => {
          //todo: zrobisz wyswietlanie errorow
        });
  }
};
</script>

<style>
</style>