import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuessActorsView from '../views/GuessActorsView.vue'
import GuessCharactersView from '../views/GuessCharactersView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/guess-actors',
        name: 'guess-actors',
        component: GuessActorsView
    },
    {
        path: '/guess-characters',
        name: 'guess-characters',
        component: GuessCharactersView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router