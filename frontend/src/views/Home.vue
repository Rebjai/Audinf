<template>
  <div id="home">
    <span>Zalogowany jako: <span class="username"> {{ username }} </span></span>
    <h1>To do</h1>
      <div class="createTask">
        <input type="text" v-model='newTask'>
        <button @click="createTask">
          <i class="fas fa-plus"></i>
        </button>
        <ul>
          <li
          v-for="(error, index) of errors"
          :key="index"
          > {{ error }} </li>
        </ul>
      </div>
      <span v-if="loading"> Wczytywanie zadań </span>
      <task-component
      v-for="task of tasks"
      :key="task._id"
      :task="task"
      @deleteTask="deleteTask($event)"
      ></task-component>
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
      newTask: '',
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
      if(this.newTask.trim() == '') {
        this.errors.push('Podaj treść zadania.')
      }
      else {
        Vue.axios.post(
          '/task',
          {
            name: this.newTask
          },
        )
        .then(result => {
          this.tasks.push(result.data.task)
          this.newTask = ''
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
  .createTask {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  .createTask > button, .createTask > input {
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
  .createTask > input {
    padding-left: 10px;
    font-size: 1.10em;
    padding: 5px 0 5px 10px;
    border-radius: 10rem;
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
</style>