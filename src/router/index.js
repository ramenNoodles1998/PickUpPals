import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import SubscriptionPage from '../views/SubscriptionPage.vue'
import FeedPage from '../views/FeedPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/loginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/subPage',
    name: 'SubscriptionPage',
    component: SubscriptionPage
  },
  {
    path: '/feedPage',
    name: 'FeedPage',
    component: FeedPage
  }
]

const router = new VueRouter({
  routes
})

export default router
