import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('../views/AlbumView.vue')
  },
  {
    path: '/artists',
    name: 'artists',
    component: () => import('../views/ArtistView.vue')
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: () => import('../views/PokemonView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
