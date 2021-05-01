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
      this.socket.on(`sendFriendRequest/${this.userId}`, ({ friendId }) => {
        this.snackbar = true
        this.message = 'You got a friend request.'

        this.addPendingFriend({ friendId })
      })
    },

    methods: {
      ...mapActions(['addPendingFriend'])
    }
  }
</script>
