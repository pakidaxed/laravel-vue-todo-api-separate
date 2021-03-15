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
                        if (response.data) {
                            context.commit('setAuthentication', {state: true})
                            context.commit('setAdminStatus', {state: true})
                            if (router.currentRoute === '/' && context.getters.getAdminStatus
                                || context.getters.getAdminStatus) {
                                router.push('/admin')
                            } else {
                                router.push(router.currentRoute)
                            }
                        } else {
                            context.commit('setAuthentication', {state: true})
                            if (router.currentRoute === '/' && context.getters.getAuth || context.getters.getAuth) {
                                router.push('/tasks')
                            } else {
                                router.push(router.currentRoute)
                            }
                        }
                    }
                )
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
