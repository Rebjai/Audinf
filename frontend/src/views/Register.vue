<template>
    <div @keyup.enter="register" id="register">
        <label>Nazwa użytkownika:</label>
        <input type="text" v-model="user.username">

        <label>Hasło:</label>
        <input type="password" v-model="user.password">

        <label>Powtórz hasło:</label>
        <input type="password" v-model="user.passwordConfirmation">

        <button @click="register">Zarejestruj</button>
        <div class="errors">
            <ul>
                <li
                v-for="(error, index) of errors"
                :key="index"
                > {{ error }} </li>
            </ul>
            <span v-if="success">Pomyślnie zarejestrowano</span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            errors: [],
            success: false,
            user: {
                username: '',
                password: '',
                passwordConfirmation: ''
            }
        }
    },
    methods: {
        register() {
            this.errors = []
            this.success = false
            if( this.user.username == '' && this.user.password == '' && this.user.passwordConfirmation == '' ){
                this.errors.push('Wypełnij pola.')
            }
            else {
                if(this.user.username.trim().length < 5 || this.user.username.trim().length > 16)
                    this.errors.push('Nazwa użytkownika powinna zawierać od 5 do 16 znaków.')
                if(this.user.password.length < 8 || this.user.password.length > 15)
                    this.errors.push('Hasło musi posiadać długość od 8 do 15 znaków.')
                if(this.user.password !== this.user.passwordConfirmation)
                    this.errors.push('Hasła muszą być takie same.')
            }
            if(!this.errors.length) {
                console.log('yey!')
                Vue.axios.post('/user/register', {
                    username: this.user.username,
                    password: this.user.password,
                    passwordConfirmation: this.user.passwordConfirmation
                })
                .then(result => {
                    this.success = true
                    this.user.username = ''
                    this.user.password = ''
                    this.user.passwordConfirmation = ''
                    setTimeout(() => {
                        this.success = false
                    }, 1500)
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
    #register {
        display: grid;
        background-color: #222;
        border-radius: 5px;
        grid-gap: 5px;
        padding: 10px;
        margin: 5px;
    }
    #register > input, button {
        border: solid #e7e7e7 1px;
        background: transparent;
        border-radius: 10rem;
        outline: none;
    }
    #register > input {
        font-size: 1.25em;
        padding: 5px 0 5px 10px;
    }
    #register > button {
        text-align: center;
        margin-top: 10px;
        width: auto;
        padding: .45em .75em;
        font-size: 1.05em;
        justify-self: right;

    }
    #register ul {
        list-style-type: none;
        padding: 10px;
        margin: 0;
    }
    #register ul * {
        color: red;
    }
    #register ul li {
        margin-top: 15px;
    }
    #register ul li:first-child {
        margin-top: 0;
    }
    #register span {
        color: rgb(46, 204, 46);
    }

    @media screen and (min-width: 800px) {
        #register { width: 400px }
    }
</style>