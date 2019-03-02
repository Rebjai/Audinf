<template>
  <div id="home">
    <h1>To do</h1>
      <task-component
      v-for="task of tasks"
      :key="task._id"
      :task="task"
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
      loading: true,
      tasks: []
    }
  },
  created() {
    Vue.axios.get(
      '/task',
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
</style>