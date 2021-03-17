import {createStore} from 'vuex'
import axios from "axios";
import router from '@/router'

export default createStore({
    state: {
        isAuthenticated: false,
        isAdmin: false,
        currentUser: null,
        currentTask: null,
        allTasks: [],
        allUsers: [],
        errors: null
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
        },
        getCurrentTask(state) {
            return state.currentTask
        },
        getAllUsers(state) {
            return state.allUsers
        },
        getErrors(state) {
            return state.errors
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
            state.allTasks = tasks ?? []
        },
        setCurrentTask(state, id) {
            state.currentTask = state.allTasks.find(x => x.id === id)
        },
        setAllUsers(state, users) {
            state.allUsers = users
        },
        resetErrors(state) {
            state.errors = null
        },
        resetUserData(state) {
            state.isAuthenticated = false
            state.isAdmin = false
            state.currentUser = null
            state.allTasks = []
            state.allUsers = []
            state.errors = null
        },
        setErrors(state, errors) {
            state.errors = errors
        }
    },
    actions: {
        async registration({commit}, regData) {
            await axios
                .post('http://localhost:8000/api/registration', regData)
                .then(response => {
                    if (response.data.success) {
                        commit('resetUserData')
                        router.push('/')
                    } else {
                        commit('setErrors', response.data)
                    }
                })
                .catch(error => console.log(error))
        },
        async deleteUser({commit, dispatch}, id) {
            await axios
                .delete('http://localhost:8000/api/users/delete/' + id)
                .then(response => {
                    if (response.data.success) {
                        console.error('deleted')
                        commit('setAllTasks')
                        dispatch('getTasks')
                    }
                })
        },
        async login({commit}, loginData) {
            await axios
                .post('http://localhost:8000/api/login', loginData)
                .then(response => {
                    if (response.data.success) {
                        commit('setAuthentication', response.data.user.role === 'ROLE_ADMIN')
                        commit('setCurrentUser', response.data.user)
                        commit('resetErrors')
                    } else {
                        console.log(response.data)
                        commit('setErrors', response.data)
                    }
                })
                .catch(error => {
                    commit('setErrors', error.response.data)
                })
        },
        async isAlive({commit}) {
            await axios
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
        async logout({commit}) {
            await axios
                .get('http://localhost:8000/api/logout')
                .then(response => {
                    console.log(response)
                    commit('resetUserData')
                    console.log('logout')
                })


        },
        async getTasks({commit}) {
            await axios
                .get('http://localhost:8000/api/tasks')
                .then(response => {
                    console.log(response.data)
                    commit('setAllTasks', response.data.tasks)
                    if (response.data.users) {
                        commit('setAllUsers', response.data.users)
                    }
                })
        },
        async createTask({commit, dispatch}, task) {
            await axios
                .post('http://localhost:8000/api/tasks/create', task)
                .then(response => {
                    if (!response.data.success) {
                        commit('setErrors', response.data)
                    } else {
                        dispatch('getTasks')
                        commit('resetErrors')
                        router.push('/admin')
                    }
                })
                .catch(error => console.log(error))
        },
        async updateTask({dispatch, commit}, task) {
            console.error(task)
            await axios
                .put('http://localhost:8000/api/tasks/update/' + task.id, task)
                .then(response => {
                    if (!response.data.success) {
                        commit('setErrors', response.data)
                    } else {
                        dispatch('getTasks')
                        commit('resetErrors')
                        router.push('/admin')
                    }
                }).catch(error => console.log(error))
        },
        async deleteTask({dispatch}, id) {
            await axios
                .delete('http://localhost:8000/api/tasks/delete/' + id)
                .then(() => dispatch('getTasks'))
        },
        async updateStatus({dispatch, commit}, statusData) {
            await axios
                .put('http://localhost:8000/api/tasks/status/' + statusData.id, statusData)
                .then(response => {
                    if(!response.data.success) {
                        commit('setErrors', response.data)
                        console.log(response.data)
                    } else {
                        dispatch('getTasks')
                        commit('resetErrors')
                    }
                })
        },
        setCurrentTask({commit}, id) {
            commit('setCurrentTask', id)
        }


    },
    modules: {}
})
