import router from "@/router";

export default {
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
        state.allUsers = users ?? []
    },

    resetErrors(state) {
        state.errors = null
    },

    /*
    Resetting everything when user logs out
     */
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
}