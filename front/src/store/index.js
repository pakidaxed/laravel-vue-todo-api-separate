import {createStore} from 'vuex'
import axios from "axios";
import router from "@/router";

export default createStore({
    state: {
        isAuthenticated: false,
        isAdmin: false
    },
    getters: {
        getAuth(state) {
            return state.isAuthenticated
        },
        getAdminStatus(state) {
            return state.isAdmin
        }
    },
    mutations: {
        setAuthentication(state, action) {
            state.isAuthenticated = action.state
        },
        setAdminStatus(state, action) {
            state.isAdmin = action.state
        },
    },
    actions: {
        isAlive(context) {
            axios
                .get('http://localhost:8000/api/alive')
                .then((response) => {
                    if (response.status === 204) {
                        console.log('RESPONSE 204')
                        context.commit('setAuthentication', {state: true})
                    }
                })
                .catch(() => {
                    context.commit('setAuthentication', {state: false})
                    context.commit('setAdminStatus', {state: false})
                })
        },
        logout(context) {

            axios
                .get('http://localhost:8000/api/logout')
                .finally()


            setTimeout(() => {
                context.commit('setAuthentication', {state: false})
                context.commit('setAdminStatus', {state: false})
                router.push('/')
            }, 2000)


        }


    },
    modules: {}
})
