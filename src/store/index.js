import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService.js'
import { getFriends, addPendingFriend, getPendingFriends, getSentPendingFriends } from '../services/FriendService.js'
import { getUserPosts, getAllPosts, deletePost, editPost } from '../services/PostService.js'
import { getGames, leaveGame } from '../services/GamesService.js'
import { editAccount } from '../services/AccountService.js'

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
    sentPendingFriends: [],
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
    },

    setUserPostData(state, { post }) {
      state.userPosts = post
      state.userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    setUserData(state, { user }) {
      state.username = user.username
      state.userId = user._id
    },

    setPendingFriendsData(state, { pendingFriends }) {
      state.pendingFriends = pendingFriends
    },

    setSentPendingFriendsData(state, { sentPendingFriends }) {
      state.sentPendingFriends = sentPendingFriends
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
    
    removeGame(state, { game }) {
      let gameIds = state.games.map((game) => {
        return game._id
      })

      state.games.splice(gameIds.indexOf(game._id), 1)
    },

    removeUserPost(state, { post }) {
      let postIds = state.userPosts.map((post) => {
        return post._id
      })

      state.userPosts.splice(postIds.indexOf(post._id), 1)
    },

    editUserPost(state, { post }) {
      let postIds = state.userPosts.map((post) => {
        return post._id
      })

      state.userPosts.splice(postIds.indexOf(post._id), 1, post)
    }
  },

  actions: {
    authenticate(context) {
      context.commit('authenticate')
    },

    async getFriends({ commit }) {
      let res = await getFriends()
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
    },

    async getSentPendingFriends({ commit }) {
      let sentPendingFriends = await getSentPendingFriends()

      commit('setSentPendingFriendsData', { sentPendingFriends: sentPendingFriends.data })
    },

    async leaveGameAction({ commit }, { gameId }) {
      let game = await leaveGame(gameId)
     
      commit('removeGame', {game: game.data})
    },

    async deletePostAction({ commit }, { postId }) {
      let post = await deletePost({ postId })

      commit('removeUserPost', { post: post.data })
    },

    async editPostActions({ commit }, { post }) {
      let postData = await editPost({ post })

      commit('editUserPost', { post: postData.data })
    },

    async editAccountAction({ commit }, { user }) {
      let userData = await editAccount({ user })

      commit('setUserData', { user: userData.data })
    }
  }
})

export default store
