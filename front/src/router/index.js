import {createRouter, createWebHistory} from 'vue-router'
import store from '../store/index.js'

const routes = [
    {
        path: '/',
        component: () => import('../views/Login.vue'),
        meta: {guest: true},
    },
    {
        path: '/registration',
        component: () => import('../views/Registration.vue'),
        meta: {guest: true}
    }
    ,
    {
        path: '/tasks',
        component: () => import('../views/user/Tasks.vue'),
        meta: {requiresAuth: true}
    }
    ,
    {
        path: '/admin',
        component: () => import('../views/admin/Dashboard.vue'),
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
        component: () => import('../views/Logout.vue'),
    },
    {
        path: '/*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes

})


router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.getAuth) {
        next(false)
    } else if (to.meta.guest && store.getters.getAuth) {
        next(false)
    } else {
        store.dispatch('isAlive')
        next();
    }
})


export default router



