<template>
  <div id="home">
    <span>Nombre: <span class="username"> {{ username }} </span></span>
      <div class="createTask">
        <input type="text" v-model='newTask.name'>
        <button @click="createTask">
          <i class="fas fa-plus"></i>
        </button>
        <div class="createTaskDate">
          <input type="date" v-model='newTask.term'>
        </div>
        <ul class="createTaskErrors">
          <li
          v-for="(error, index) of errors"
          :key="index"
          > {{ error }} </li>
        </ul>
      </div>
      <span v-if="loading"> Espera un momento... </span>
      <transition-group name="fadeTask" tag="div" class="task-list">
        <task-component
        v-for="task of tasks"
        :key="task._id"
        :task="task"
        @deleteTask="deleteTask($event)"
        ></task-component>
      </transition-group>
  </div>
</template>

<script>
import Vue from 'vue'
import TaskComponent from '../components/Task.vue'

export default {
  components: {
    'task-component': TaskComponent
  },
  data() {
    return {
      username: '',
      newTask: {
        name: '',
        term: ''
      },
      errors: [],
      loading: true,
      tasks: []
    }
  },
  methods: {
    deleteTask(id) {
      this.tasks.filter((v,i) => { if(v._id==id) {
        Vue.axios.delete(`task/${id}`)
        .then(result => {
            this.tasks.splice(i, 1)
        }).catch(err => {
            //todo: zrobic wyswietlanie errorow
        })
      }})
    },
    createTask() {
      this.errors = []
      if(this.newTask.name.trim() == '') {
        this.errors.push('No puedo hacer una tarea vacía')
      }
      else {
        Vue.axios.post(
          '/task',
          {
            name: this.newTask.name,
            term: this.newTask.term
          },
        )
        .then(result => {
          this.tasks.unshift(result.data.task)
          this.newTask = {
            name: '',
            term: ''
          }
        })
        .catch(error => {
          this.errors = []
          this.errors = error.response.data.errors
        })
      }
    },
    setUsernameFromToken() {
      this.username = localStorage.getItem('username')
    }
  },
  created() {
    this.setUsernameFromToken(),
    //Pobieranie zadan z bazy danych
    Vue.axios.get('/task')
    .then(result => {
      this.tasks = result.data.tasks
      this.loading = false
    })
    .catch(error => {
      //todo: zrobisz wyswietlanie errorow
    })
  }
}
</script>

<style>
  #home {
    display: grid;
    background-color: #222;
    border-radius: 5px;
    grid-gap: 5px;
    padding: 10px;
    margin: 5px;
  }
  #home > h1{
    text-align: center;
  }
  .createTaskErrors {
    grid-column: 1 / -1;
  }
  .createTask{
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
  .createTask > button, .createTask > input, .createTaskDate > input {
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
  .createTask > input, .createTaskDate > input {
    padding-left: 10px;
    font-size: 1.10em;
    padding: 5px 10px 5px 10px;
    border-radius: 10rem;
  }
  .createTaskDate > input {
    font-size: .9em;
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

  .fadeTask-enter-active, .fadeTask-leave-active {
    transition: all .5s
  }
  .fadeTask-enter, .fadeTask-leave-to {
    opacity: 0;
    transform: rotateX(90deg)
  }

  @media screen and (min-width: 810px) {
    .createTask {
      grid-template-columns: 1fr 1fr auto;
    }
    .createTask > input[type=text] {
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
  }
</style>