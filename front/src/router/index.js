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
        meta: {requiresAuth: true, requiresAdmin: true},
        children: [
            {
                path: 'new',
                component: () => import('../components/admin/NewTask.vue'),
                meta: {requiresAuth: true, requiresAdmin: true},
            },
            {
                path: 'edit/:id',
                component: () => import('../components/admin/EditTask.vue'),
                meta: {requiresAuth: true, requiresAdmin: true},
            },
        ]
    },
    {
        path: '/admin/users',
        component: () => import('../views/admin/Users.vue'),
        meta: {requiresAuth: true, requiresAdmin: true}

    },
    {
        path: '/logout',
        component: () => import('../views/Logout.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes

})


router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.getAuthenticated) {
        next('/')
    } else if (to.meta.guest && store.getters.getAuthenticated) {
        next(false)
    } else {
        next()
    }
})


export default router



