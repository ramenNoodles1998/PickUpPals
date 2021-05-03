import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupPage from '../views/SignupPage.vue'
import SubscriptionPage from '../views/SubscriptionPage.vue'
import FeedPage from '../views/FeedPage.vue'
import GamesPage from '../views/GamesPage.vue'
import AccountPage from '../views/AccountPage.vue'
import * as auth from '../services/AuthService.js'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    beforeEnter: (to, from, next) => {
      if(!auth.isLoggedIn()) {
        next()
      } else {
        next('/feedPage')
      }
    }
  },
  {
    path: '/loginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signupPage',
    name: 'SignupPage',
    component: SignupPage
  },
  {
    path: '/gamesPage',
    name: 'GamesPage',
    component: GamesPage,
    beforeEnter: (to, from, next) => {
      if(auth.isLoggedIn()) {
        next()
      } else if (auth.isLoggedIn()){
        next('/feedPage')
      } else {
        next('/loginPage')
      }
    }
  },
  {
    path: '/subPage',
    name: 'SubscriptionPage',
    component: SubscriptionPage,
    beforeEnter: (to, from, next) => {
      if(auth.isLoggedIn()) {
        next()
      } else {
        next('/loginPage')
      }
    }
  },
  {
    path: '/feedPage',
    name: 'FeedPage',
    component: FeedPage,
    beforeEnter: (to, from, next) => {
      if(auth.isLoggedIn()) {
        next()
      } else {
        next('/loginPage')
      }
    }
  },
  {
    path: '/accountPage/:accountId',
    name: 'AccountPage',
    component: AccountPage,
    beforeEnter: (to, from, next) => {
      if(auth.isLoggedIn()) {
        next()
      } else {
        next('/loginPage')
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
