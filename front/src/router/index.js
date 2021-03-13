import {createRouter, createWebHistory} from 'vue-router'
import store from '../store/index.js'


const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: {guest: true},
    },
    {
        path: '/registration',
        component: () => import(/* webpackChunkName: "registration" */ '../views/Registration.vue'),
        meta: {guest: true}
    }
    ,
    {
        path: '/tasks',
        component: () => import(/* webpackChunkName: "tasks" */ '../views/user/Tasks.vue'),
        meta: {requiresAuth: true}
    }
    ,
    {
        path: '/admin',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Dashboard.vue'),
        meta: {requiresAuth: true},
        children: [
            {
                path: 'users',
                component: () => import('../views/admin/Users'),
                meta: {requiresAuth: true}
            }
        ]
    },
    {
        path: '/logout',
        component: () => import(/* webpackChunkName: "admin/users" */ '../views/Logout.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes

})

router.beforeEach((to, _, next) => {
    store.dispatch('isAlive')
    if (to.meta.requiresAuth && !store.isAuthenticated) {
        next(false)
    } else if (to.meta.guest && store.isAuthenticated) {
        next(false)
    } else {
        next();
    }
})


export default router



