<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      color="green"
      top
      @click:outside="snackbar = false"
    >
      <div class="white--text">
        <strong>{{ message }}</strong>
      </div>

    </v-snackbar>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import io from 'socket.io-client'

  export default {
    name: 'NotificationSnackBar',

    data: () => ({
      socket: {},
      snackbar: false,
      message: '',
    }),

    created() {
      this.socket = io(this.apiUrl)
    },

    computed: {
      ...mapState(['apiUrl', 'userId', 'friends'])
    },

    mounted() {
      this.socket.on(`gotFriendRequest/${this.userId}`, () => {
        this.snackbar = true
        this.message = 'You got a friend request.'
        this.getPendingFriends()
        this.getFriends()
        this.getSentPendingFriends()
      })

      this.socket.on(`friendRequestAccepted/${this.userId}`, ({ loggedInUser }) => {
        this.snackbar = true
        this.message = `${loggedInUser.username} has accepted your friend request.`
        this.getPendingFriends()
        this.getFriends()
        this.getSentPendingFriends()
      })

      
      this.socket.on(`acceptedRequest/${this.userId}`, () => {
        this.getSentPendingFriends()
        this.getPendingFriends()
        this.getFriends()
      })

      this.socket.on(`friendRequestSent/${this.userId}`, () => {
        this.snackbar = true
        this.message = 'Friend Request Sent.'
        this.getSentPendingFriends()
        this.getPendingFriends()
        this.getFriends()
      })
    },

    methods: {
      ...mapActions(['addPendingFriend', 'getFriends', 'getPendingFriends', 'getSentPendingFriends'])
    }
  }
</script>
