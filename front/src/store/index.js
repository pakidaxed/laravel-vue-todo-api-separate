import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        isAuthenticated: false,
        isAdmin: false
    },
    mutations: {
        setAuthentication(state, status) {
            state.isAuthenticated = status
        },
        setAdminStatus(state, status) {
            state.isAdmin = status
        }
    },
    actions: {
        isAlive(context, state) {
            axios
                .get('http://localhost:8000/api/alive')
                .then((response) => {
                    if (response.status === 204) {
                        console.log('dish cactched')
                        context.commit('setAuthentication', true)
                        console.log(state.isAuthenticated)
                    }


                })

                .catch(() => {
                    console.log('alive status failed')
                    context.commit('setAuthentication', false)
                    context.commit('setAdminStatus', false)
                })
        },
        logout(context)
        {
            axios
                .get('http://localhost:8000/api/logout')
                .then(() => {
                    context.commit('setAuthentication', false)
                    context.commit('setAdminStatus', false)
                })
        }
    },
    modules: {}
})
