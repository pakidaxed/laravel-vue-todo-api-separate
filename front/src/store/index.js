import {createStore} from 'vuex'
import axios from "axios";
import router from '@/router'

export default createStore({
    state: {
        isAuthenticated: false,
        isAdmin: false,
        currentUser: null,
        allTasks: null,
    },
    getters: {
        getAuthenticated(state) {
            return state.isAuthenticated
        },
        getAdmin(state) {
            return state.isAdmin
        },
        getCurrentUser(state) {
            return state.currentUser
        },
        getAllTasks(state) {
            return state.allTasks
        }
    },
    mutations: {
        setAuthentication(state, admin = false) {
            state.isAuthenticated = true
            if (admin) {
                state.isAdmin = true
                router.push('/admin')
            } else {
                router.push('/tasks')
            }
        },
        setCurrentUser(state, data) {
            state.currentUser = data
        },
        setAllTasks(state, tasks) {
            state.allTasks = tasks
        },
        resetUserData(state) {
            state.isAuthenticated = false
            state.isAdmin = false
            state.currentUser = null
            state.allTasks = null
        }
    },
    actions: {
        registration(regData) {
            axios
                .post('http://localhost:8000/api/registration', regData)
                .then(response => console.log(response))
        },
        login({commit}, loginData) {
            axios
                .post('http://localhost:8000/api/login', loginData)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response)
                        commit('setAuthentication', response.data.role === 'ROLE_ADMIN')
                        commit('setCurrentUser', response.data)
                    }
                })
        },
        isAlive({commit}) {
            axios
                .get('http://localhost:8000/api/alive')
                .then(response => {
                    if (response.status === 200) {
                        commit('setAuthentication', response.data.role === 'ROLE_ADMIN')
                        commit('setCurrentUser', response.data)
                        console.log('still alive')


                    }
                }).catch(error => {
                    console.log(error)
                if (error.request.status === 511) {
                    commit('resetUserData')
                    console.clear()
                    console.log('dead')
                }
            })

        },
        // isAlive(context) {
        //     axios
        //         .get('http://localhost:8000/api/alive')
        //         .then((response) => {
        //                 if (response.data) {
        //                     context.commit('setAuthentication', {state: true})
        //                     context.commit('setAdminStatus', {state: true})
        //                     if (router.currentRoute === '/' && context.getters.getAdminStatus
        //                         || context.getters.getAdminStatus) {
        //                         router.push('/admin')
        //                     } else {
        //                         router.push(router.currentRoute)
        //                     }
        //                 } else {
        //                     context.commit('setAuthentication', {state: true})
        //                     if (router.currentRoute === '/' && context.getters.getAuth || context.getters.getAuth) {
        //                         router.push('/tasks')
        //                     } else {
        //                         router.push(router.currentRoute)
        //                     }
        //                 }
        //             }
        //         )
        //         .catch(() => {
        //             context.commit('setAuthentication', {state: false})
        //             context.commit('setAdminStatus', {state: false})
        //         })
        // },
        logout(context) {
            axios
                .get('http://localhost:8000/api/logout')
                .then(response => {
                    console.log(response)
                    context.commit('resetUserData')
                    console.log('logout')
                })


        },
        getTasks(context) {
            axios
                .get('http://localhost:8000/api/tasks')
                .then(response => context.commit('setAllTasks', response.data))
                .then(r => console.log(r))
        }


    },
    modules: {}
})
