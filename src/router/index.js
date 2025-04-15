import { createRouter, createWebHistory } from 'vue-router'
import CoffeeMachine from '../components/CoffeeMachine.vue'
import Settings from '../components/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CoffeeMachine
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

export default router 