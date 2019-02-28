<template>
    <div @keydown.enter="login">
        <label>Username:</label>
        <input type="text" v-model="username">

        <label>Password:</label>
        <input type="password" v-model="password">

        <button @click="login">Login</button>
        <div class="errors">
            <ul>
                <li
                v-for="(error, index) of errors"
                :key="index"
                > {{ error }} </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    methods: {
        login() {
            if(this.username == '' || this.password == '') {
                this.errors.push('Wypełnij pola.')
            }
            else {
                Vue.axios.post('http://localhost:7777/api/user/login', {
                    username: this.username,
                    password: this.password
                })
                .then(result => {
                    console.log(result)
                    localStorage.setItem('token', result.data.token)
                    this.$router.push({ name: 'home' })
                    this.$emit('authenticated', true)
                })
                .catch(error => {
                    console.log(error.response.data)
                    this.errors = error.response.data.errors
                })
            }
        }
    }
}
</script>

<style>
    
</style>