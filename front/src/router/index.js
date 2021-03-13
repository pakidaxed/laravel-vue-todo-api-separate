import {createRouter, createWebHistory} from 'vue-router'

const requiresAuth = true;


const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: {guest: false},
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import(/* webpackChunkName: "registration" */ '../views/Registration.vue'),
        meta: {guest: true}
    }
    ,
    {
        path: '/tasks',
        name: 'Tasks',
        component: () => import(/* webpackChunkName: "tasks" */ '../views/user/Tasks.vue'),
        meta: {requiresAuth: true}
    }
    ,
    {
        path: '/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Dashboard.vue'),
        meta: {requiresAuth: true}
    }
    ,
    {
        path: '/admin/users',
        name: 'AdminUsers',
        component: () => import(/* webpackChunkName: "admin/users" */ '../views/admin/Users.vue'),
        meta: {requiresAuth: true}
    },


]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !requiresAuth) next({ name: 'Login' })
    else next()
})
