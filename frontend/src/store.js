export default {
    methods: {
        isLogged() {
            return localStorage.getItem('token') !== null ? true : false
        },
        clearUserData() {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('name')
            localStorage.removeItem('semester')
        }
    }
}