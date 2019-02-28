export default {
    methods: {
        isLogged() {
            return localStorage.getItem('token') !== null ? true : false
        }
    }
}