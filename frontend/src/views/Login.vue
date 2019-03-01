<template>
    <div @keydown.enter="login" class="login">
        
        <label>Username:</label>
        <input type="text" v-model="username">

        <label>Password:</label>
        <input type="password" v-model="password">

        <button @click="login" class="l-button">Login</button>
        <div class="errors">
            <ul>
                <li :style="errorStyle"
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
            errors: [],
            errorStyle: {color: 'red'}
        }
    },
    methods: {
        login() {
            this.errors = []
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
                    this.errors = error.response.data.errors
                })
            }
        }
    }
}
</script>

<style>
    .login {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 1fr;
        grid-gap: 5px;
        padding: 2em;
        background-color: #191919;
        border-radius: 5px;
    }

    .l-button {
        grid-column: 2 / 3;
        width: 50%;
        justify-self: right;
    }

    .login input, .login button{
        background-color: transparent;
        border: solid #e7e7e7 1px;
        padding: .15em .25em;
        border-radius: 5px;
        outline: none;
        font-size: 1.25em;
    }

    @media screen and (min-width: 800px) {
        .login {
            width: 800px;
        }
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
</style>