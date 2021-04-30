import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService.js'
import { findFriends } from '../services/FeedService.js'
import { getUserPosts, getPosts, getSubscriptionPosts } from '../services/FeedService.js'
import { getGames } from '../services/GamesService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: 'http://localhost:8080',
    //apiUrl: 'http://pupbackendapp.eba-purmsi37.us-east-1.elasticbeanstalk.com/',
    username: null,
    userId: null,
    friends: [],
    allPosts: [],
    userPosts: [],
    games: []
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

    async findFriends({ state }) {
      let res = await findFriends()
      state.friends = res.data

      return state.friends
    },

    async getAllPosts({ state }) {
      let postPromises = [getPosts(), getSubscriptionPosts()]

      postPromises = await Promise.all(postPromises)

      let filteredPosts = postPromises.map((post) => {
        return post.data
      })

      state.allPosts = filteredPosts[0].concat(filteredPosts[1])
    },

    async getUserPosts({ state }) {
      let posts = await getUserPosts()
      state.userPosts = posts.data
    },

    async getGames({ state }) {
      let games = await getGames()
      console.log(games)
      state.games = games.data
    },

    joinGame({ state }, { post }) {
      state.games.push(post)
    }
  }
})
