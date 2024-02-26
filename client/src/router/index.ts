import { createWebHistory, createRouter } from 'vue-router'
import useStore from '../store'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'index', component: () => import('../pages/index.vue'), children: [
            { path: '', name: 'home', component: () => import('../pages/home.vue') },
            { path: '/leaders', name: 'leaders', component: () => import('../pages/leaders.vue') },
            { path: '/seasons', name: 'seasons', component: () => import('../pages/seasons.vue') },
            { path: '/login', name: 'login', component: () => import('../pages/login.vue') },
            { path: '/register', name: 'register', component: () => import('../pages/register.vue') },
        ] },

        { path: '/profile', name: 'profile', component: () => import('../pages/player/index.vue'), children: [
            { path: '', name: 'profile-page', component: () => import('../pages/player/profile.vue') },
            { path: 'timeline', name: 'profile-timeline', component: () => import('../pages/player/timeline.vue') },
            { path: 'history', name: 'profile-history', component: () => import('../pages/player/history.vue') },
            { path: 'notifications', name: 'profile-notifications', component: () => import('../pages/player/notifications.vue') },
            ],
            beforeEnter: (_, __, next) => {
                const store = useStore()
                if(store.isLogged) next()
                else next('/login')
            }
        },
        
        { path: '/room/:id', name: 'chess', component: () => import('../pages/chess.vue') },

        { path: '/admin', name: "admin", component: () => import('../pages/admin/index.vue'), children: [
            { path: '', name: 'admin-dashboard', component: () => import('../pages/admin/dasboard.vue') },
            { path: 'users', name: 'admin-users', component: () => import('../pages/admin/users.vue') },
            { path: 'tournaments', name: 'admin-tournaments', component: () => import('../pages/admin/tournaments.vue') },
            { path: 'seasons', name: 'admin-seasons', component: () => import('../pages/admin/seasons.vue') },
            { path: 'matchs', name: 'admin-matchs', component: () => import('../pages/admin/matchs.vue') },
            ],
            beforeEnter: (_, __, next) => {
                const store = useStore()

                if(!store.isLogged) {
                    alert('Avtorizatsiyadan o\'ting!')
                    next('/login')
                    return
                }
                
                if(!store.isAdmin) {
                    alert('Ushbu sahifa faqat admin uchun!')
                    next('/')
                    return
                }

                next()
            }
        }
        //     beforeEnter: (_, __, next) => {
        //         // if (store().isLogged) next()
        //         // else next('/login')
        //         next()
        //     }
        // },
        // {
        //     path: '/login',
        //     component: () => import('../pages/login.vue')
        // }
    ],
    scrollBehavior(to, _, savedPosition){
        if (to.hash) return { el: to.hash }
        else if (savedPosition) return savedPosition
        else return { top: 0 }
    },
})