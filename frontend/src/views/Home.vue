<template>
  <div id="home">
    <h1>Home page</h1>
    <ul>
      <task-component
      v-for="task of tasks"
      :key="task._id"
      :task="task"
      ></task-component>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import TaskComponent from '../components/Task.vue'

export default {
  components: {
    'task-component': TaskComponent
  },
  data() {
    return {
      loading: true,
      tasks: []
    }
  },
  created() {
    axios.get(
      'http://localhost:7777/api/task',
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
    )
    .then(result => {
      console.log(result.data)
      this.tasks = result.data.tasks
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style>
  #home {
    padding: 10px;
    background-color: #191919;
    border-radius: 5px;
  }

  h1 {
    text-align: center;
  }

  ul {
    display: grid;
    grid-gap: 5px;
  }
  @media screen and (min-width: 800px) {
        #home {
            width: 800px;
        }
    }
</style>