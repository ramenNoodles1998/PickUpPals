<template>
  <v-app>
    <v-main>
      <NotificationSnackbar />

      <AddFriendModal 
        :dialog="friendModal"
        :friend="friend"
        @close="friendModal = false"
      />

      <NavBar/>

      <router-view></router-view>

      <Footer @open-friend-modal="openFriendModal"/>
    </v-main>
  </v-app>
</template>

<script>
  import NavBar from './components/BaseComponents/NavBar.vue'
  import Footer from './components/BaseComponents/Footer.vue'
  import NotificationSnackbar from './components/BaseComponents/NotificationSnackbar.vue'
  import AddFriendModal from './components/FriendComponents/AddFriendModal.vue'
  import { mapActions } from 'vuex'


  export default {
    name: 'App',

    components: {
      NavBar,
      Footer,
      NotificationSnackbar,
      AddFriendModal
    },

    data: () => ({
      friendModal: false,
      friend: {}
    }),

    mounted() {
      this.getFriends()
      this.getPendingFriends()
      this.getSentPendingFriends()
    },

    methods: {
      ...mapActions(['getFriends', 'getPendingFriends', 'getSentPendingFriends']),

      openFriendModal(friend) {
        this.friendModal = true
        this.friend = friend
      }
    }
  }
</script>

