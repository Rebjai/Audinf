<template>
  <div id="home" class="container has-text-centered">
    <div class="columns is-multiline">
      <div class="column is-12">
        <span>
          IP del equipo:
          <span class="username">{{ ip }}</span>
        </span>
      </div>
      <div class="column">
        <span>
          semestre:
          <span class="username">{{ semester }}</span>
        </span>
      </div>
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
    <div class>
      <div class>
        <label for>Ingresa tu grupo:</label>
        <div class="select is-info">
          <select v-model="log.group">
            <option v-for="grp in groups" :key="grp.id" :value="grp.name">{{grp.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class>
      <div class>
        <label for>Selecciona tu profesor:</label>
        <div class="select is-info">
          <select v-model="log.teacher">
            <option v-for="tchr in teachers" :key="tchr.id" :value="tchr.name">{{tchr.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <!-- <div class="techstack field">
      <div class="control">
        <div class="select select-group">
          <select name="group" id="group">
            <option v-for="grp in groups" :key="grp.id" :value="grp.name">{{grp.name}}</option>
          </select>
        </div>
      </div>
    </div>-->

    <div class="createStack container box">
      <!-- checkbox -->
      <div class="message-header has-background-link">
        <p>Selecciona los programas a utilizar</p>
      </div>
      <article class="message category" v-for="opt in stackOptions" :key="opt.category">
        <div class="message-header">
          <p>{{opt.category}}</p>
          <!-- <button class="delete" aria-label="delete"></button> -->
        </div>
        <div class="message-body">
          <div class="tec" v-for="tec in opt.programs" :key="tec">
            <input type="checkbox" :id="'checkbox'+tec" :value="tec" v-model="selected" />
            <label :for="'checkbox'+tec">{{ tec }}</label>
          </div>
        </div>
      </article>
      <!-- <div class="category" v-for="opt in stackOptions" :key="opt.category">
        <span>{{opt.category}}</span>
        <div class="tec" v-for="tec in opt.programs" :key="tec">
          <input type="checkbox" :id="'checkbox'+tec" :value="tec" v-model="selected" />
          <label :for="'checkbox'+tec">{{ tec }}</label>
        </div>
      </div>-->
      <div class="other tec">
        <input type="checkbox" name="checkbox-other" id="option-other" v-model="isOther" />
        <label for="option-other">otro</label>
        <input v-if="isOther" type="text" name id v-model="other" @keypress.enter="pushToStack" />
      </div>
      <div class="selected">selected: {{selected}}</div>

      <div v-for="tec in selected" :key="tec" class="stack-item" @click="popFromStack(tec)">
        <span>{{tec}}</span>
      </div>

      <!-- end checkbox -->
      <div class="field">
        <label for="comment">comentarios/observaciones:</label>
        <div class="control">
          <textarea class="textarea is-primary" placeholder="Primary textarea" v-model="log.comment" name="comment"></textarea>
        </div>
      </div>
      <a class="button is-link" @click="updateLog">Enviar</a>

      <!-- <div class="createTask">
        <input type="text" v-model="newTask.name" />
        <button @click="createTask">
          <i class="fas fa-plus"></i>
        </button>
        <div class="createTaskDate">
          <input type="date" v-model="newTask.term" />
        </div>
        <ul class="createTaskErrors">
          <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <span v-if="loading">Espera un momento...</span>
      <transition-group name="fadeTask" tag="div" class="task-list">
        <task-component
          v-for="task of tasks"
          :key="task._id"
          :task="task"
          @deleteTask="deleteTask($event)"
        ></task-component>
      </transition-group>-->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import TaskComponent from "../components/Task.vue";
import getUserIP from "../utils/getClientIP";
import router from '../router';

export default {
  components: {
    "task-component": TaskComponent
  },
  data() {
    return {
      username: "",
      name: "",
      semester: 0,
      isOther: false,
      other: "",
      ip: "0.0.0.0",
      selected: [],
      groups: [],
      teachers: [],
      log:{
        comment:"",
        group: "",
        stack: [],
        teacher: ""
      },
      stackOptions: [
        {
          category: "ofimática",
          programs: ["word", "office", "excel", "acces"]
        },
        {
          category: "desarrollo",
          programs: ["VS code", "Netbeans", "Atom", "Eclipse"]
        }
      ],
      newTask: {
        name: "",
        term: ""
      },
      errors: [],
      loading: true,
      tasks: [],
      stack: []
    };
  },
  methods: {
    getIndex() {},
    updateLog() {
      let area = localStorage.getItem("logID");
      console.log("area", area);
      if (this.selected.length > 0 && this.log.teacher !== "" && this.log.group !== "") {
        Vue.axios
        .put(`log/${area}`, {
          comment: this.log.comment,
          stack: this.selected,
          group: this.log.group,
          teacher: this.log.teacher
        })
        .then(result => {
          this.loading = false;
          this.log.comment = ""
          this.log.group = ""
          this.selected = []
          
          console.log("result", result);
          router.push({name: 'continue'})
        })
        .catch(error => {
          console.log(error);

          //todo: zrobisz wyswietlanie errorow
        });
      }
      else{
        console.log("llena los datos");
        
      }

      
    },
    getTeachers() {
      Vue.axios
        .get(`teacher/`)
        .then(result => {
          this.teachers = result.data.teachers;
          this.loading = false;
          console.log("teacher", result.data.teachers);
        })
        .catch(error => {
          console.log(error);

          //todo: zrobisz wyswietlanie errorow
        });
    },
    getGroups(semester) {
      let area = localStorage.getItem("area");
      console.log("sem", semester);

      Vue.axios
        .post(`group/${semester}`, {
          test: "test",
          area: area
        })
        .then(result => {
          this.groups = result.data.groups;
          this.loading = false;
          console.log("groups", result.data.groups);
        })
        .catch(error => {
          console.log(error);

          //todo: zrobisz wyswietlanie errorow
        });
    },
    popFromStack(tec) {
      let index = this.selected.findIndex(val => val == tec);
      this.selected.splice(index, 1);
      console.log(tec, index);
    },
    pushToStack() {
      this.selected.push(this.other);
      this.other = "";
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
      this.semester = localStorage.getItem("semester");
    },
    setClientIP() {
      console.log("setting ip");

      let self = this;
      getUserIP(function(ip) {
        // Usage
        console.log("Got IP! :" + ip);
        self.ip = ip;
      });
    }
  },
  created() {
    this.setUsernameFromToken();
    this.setClientIP();
    this.getTeachers();
    this.getGroups(localStorage.getItem("semester"));

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
/* #home {
  display: grid;
  background-color: #222;
  border-radius: 5px;
  grid-gap: 5px;
  padding: 10px;
  margin: 5px;
}
#home > h1 {
  text-align: center;
}
.createTaskErrors {
  grid-column: 1 / -1;
}
.createTask {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr auto;
  align-items: center;
}
.createTaskDate {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.createTask > button,
.createTask > input,
.createTaskDate > input {
  outline: none;
  background-color: transparent;
  border: solid #e7e7e7 1px;
}
.createTask > button {
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: 1.25em;
  border-radius: 100%;
  width: 1.75em;
  height: 1.75em;
}
.createTask > input,
.createTaskDate > input {
  padding-left: 10px;
  font-size: 1.1em;
  padding: 5px 10px 5px 10px;
  border-radius: 10rem;
}
.createTaskDate > input {
  font-size: 0.9em;
}
.username {
  background-color: #333;
  padding: 2px;
  border-radius: 5px;
}
ul {
  list-style-type: none;
  padding: 10px;
  margin: 0;
}
ul li {
  color: red;
}
.task-list {
  overflow: hidden;
}

.fadeTask-enter-active,
.fadeTask-leave-active {
  transition: all 0.5s;
}
.fadeTask-enter,
.fadeTask-leave-to {
  opacity: 0;
  transform: rotateX(90deg);
}

@media screen and (min-width: 810px) {
  .createTask {
    grid-template-columns: 1fr 1fr auto;
  }
  .createTask > input[type="text"] {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  .createTask > .createTaskDate {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  .createTask > button {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  .createTaskErrors {
    grid-column: 1 / -1;
    grid-row: 2 / 3;
  }
  .stack-item {
    display: inline-block;
    margin: 0 0.25rem;
    padding: 0.5rem;
    border: 2px solid #e7e7e7;
    border-radius: 15px;
  } */
/* } */
</style>