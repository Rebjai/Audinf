<template>
    <div @keyup.enter="register" id="register">
        <label>Tipo de usuario:</label>
        <select name="userType" id="userType">
            <option value="Estudiante">Estudiante</option>
            <option value="Docente">Docente </option>
        </select>

        <label>Número de Control*:</label>
        <input type="text" v-model="user.username">

        <label>Contraseña*:</label>
        <input type="password" v-model="user.password">

        <label>Confirmar Contraseña*:</label>
        <input type="password" v-model="user.passwordConfirmation">
        
        <label>Nombre:</label>
        <input type="text" v-model="user.name">
        
        <label>semestre:</label>
        <input type="number" value="1" min="1" max="8" v-model="user.semester">

        

        <button @click="register">Registrarse</button>
        <div class="errors">
            <ul>
                <li
                v-for="(error, index) of errors"
                :key="index"
                > {{ error }} </li>
            </ul>
            <span v-if="success">Registro Exitoso</span>
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
                passwordConfirmation: '',
                name: '',
                semester: 1
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
                if(this.user.username.trim().length < 8 || this.user.username.trim().length > 8)
                    this.errors.push('El número de control debe tener 8 números')
                if(this.user.password.length < 4 || this.user.password.length > 4)
                    this.errors.push('La contraseña debe de ser de 4 caracteres')
                if(this.user.password !== this.user.passwordConfirmation)
                    this.errors.push('Las contraseñas deben coincidir')
            }
            if(!this.errors.length) {
                Vue.axios.post('/user/register', {
                    username: this.user.username,
                    password: this.user.password,
                    passwordConfirmation: this.user.passwordConfirmation,
                    name: this.user.name,
                    semester: this.user.semester
                })
                .then(result => {
                    this.success = true
                    this.user.username = ''
                    this.user.password = ''
                    this.user.passwordConfirmation = ''
                    this.user.name = ''
                    this.user.semester = 1
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
    #register > input, select {
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
    #register select {
        border: solid #e7e7e7 1px;
        background: transparent;
        border-radius: 10rem;
        outline: none;
    }
    select > option{
        border: solid #e7e7e7 1px;
        background: black;
        border-radius: 10rem;
        outline: none;
    }

    @media screen and (min-width: 800px) {
        #register { width: 400px }
    }
</style>