export default {
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
}