import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService.js'
import { findFriends } from '../services/FeedService.js'
import { getUserPosts, getAllPosts, addPendingFriend, getPendingFriends } from '../services/FeedService.js'
import { getGames } from '../services/GamesService.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: 'http://localhost:8080',
    //apiUrl: 'http://pupbackendapp.eba-purmsi37.us-east-1.elasticbeanstalk.com/',
    username: null,
    userId: null,
    friends: [],
    pendingFriends: [],
    allPosts: [],
    userPosts: [],
    games: [],
    addFriendModal: false
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
    },

    setUserPostData(state, { post }) {
      state.userPosts = post
    },

    setPendingFriendsData(state, { pendingFriends }) {
      state.pendingFriends = pendingFriends
    },

    setAllPostData(state, { posts }) {
      state.allPosts = posts
      state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    setGamesData(state, { games }) {
      state.games = games
      state.games.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    setFriends(state, { friends }) {
      state.friends = friends
    },

    addNewAllPost(state, { post }) {
      state.allPosts.unshift(post)
    },

    addNewGame(state, { game }) {
      state.games.unshift(game)
    },

    toggleFriendModal(state, modalBoolean) {
      state.addFriendModal = modalBoolean
    }
  },

  actions: {
    authenticate(context) {
      context.commit('authenticate')
    },

    async findFriends({ commit }) {
      let res = await findFriends()
      commit('setFriends', { friends: res.data })

      return res.data
    },

    async getAllPosts({ commit }) {
      let posts = await getAllPosts()

      commit('setAllPostData', { posts: posts.data })
    },

    async getUserPosts({ commit }) {
      let posts = await getUserPosts()

      commit('setUserPostData', { post: posts.data })
    },

    async getGames({ commit }) {
      let games = await getGames()

      commit('setGamesData', { games: games.data })
    },

    async addPendingFriend({ commit }, { friendId }) {
      let pendingFriends = await addPendingFriend({ friendId })

      commit('setPendingFriendsData', { pendingFriends: pendingFriends.data })
    },

    async getPendingFriends({ commit }) {
      let pendingFriends = await getPendingFriends()

      commit('setPendingFriendsData', { pendingFriends: pendingFriends.data })
    }
  }
})

export default store
