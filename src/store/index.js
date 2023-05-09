import { createStore } from 'vuex'

const store = createStore({
    state: {
        isLogin: localStorage.getItem('token') ? true : false,
    },
    mutations: {
        login(state) {
            state.isLogin = true
        },
        logout(state) {
            state.isLogin = false
        }
    },
    getters:{
        isLogin(state){
            return state.isLogin
        }
    }
})

export default store