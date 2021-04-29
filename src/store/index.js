import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService'
import { findFriends } from '../services/FeedService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    //apiUrl: 'http://localhost:8080',
    apiUrl: 'http://pupbackendapp.eba-purmsi37.us-east-1.elasticbeanstalk.com/',
    username: null,
    userId: null,
    friends: []
  },

  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if(state.isLoggedIn) {
        state.username = auth.getUsername()
        state.userId = auth.getUserId()
      } else {
        state.userId = null
        state.username = null
      }
    }
  },

  actions: {
    authenticate(context) {
      context.commit('authenticate')
    },

    async findFriends({state}) {
      let res = await findFriends()
      state.friends = res.data

      return state.friends
    }
  }
})
