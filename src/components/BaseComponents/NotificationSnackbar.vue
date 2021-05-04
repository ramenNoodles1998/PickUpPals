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

    computed: {
      ...mapState(['apiUrl', 'userId', 'friends'])
    },

    created() {
      this.socket = io(this.apiUrl)
    },

    watch: {
      userId(newId) {
        this.socket.on(`friendRequestDeclined/${newId}`, ({ userFriend }) => {
          this.snackbar = true
          this.message = `${userFriend.username} Has Declined Your Friend Request.`
          this.getFriends()
          this.getSentPendingFriends()
        })
              
        this.socket.on(`declinedRequest/${newId}`, () => {
          this.getFriends()
          this.getPendingFriends()
        })

        this.socket.on(`friendRequestAccepted/${newId}`, ({ userFriend }) => {
          this.snackbar = true
          this.message = `${userFriend.username} Has Accepted Your Friend Request.`
          this.getFriends()
          this.getSentPendingFriends()
          this.getAllPosts()
        })

        this.socket.on(`acceptedRequest/${newId}`, () => {
          this.getFriends()
          this.getPendingFriends()
          this.getAllPosts()
        })

        this.socket.on(`friendRequestSent/${newId}`, () => {
          this.snackbar = true
          this.message = 'Friend Request Sent.'
          this.getFriends()
          this.getSentPendingFriends()
        })

        this.socket.on(`gotFriendRequest/${newId}`, () => {
          this.snackbar = true
          this.message = 'You Got A Friend Request.'
          this.getFriends()
          this.getPendingFriends()
        })
      }
    },

    methods: {
      ...mapActions(['addPendingFriend', 'getFriends', 'getPendingFriends', 'getSentPendingFriends', 'getAllPosts'])
    }
  }
</script>
