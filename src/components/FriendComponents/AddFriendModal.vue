<template>
  <div>
    <v-dialog
      v-model="dialog"
      color="green"
      max-width="500"
      @click:outside="$emit('close')"
    >
      <v-card>
        <v-card-title class="headline green font-weight-light white--text">
            Friend Request
        </v-card-title>

        <v-card-text class="body-1 font-weight-light mt-2">
          {{ friend.username}} has sent you a friend request.
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green"
                text
                @click="sendFriendRequestAdded()"
            >
                Accept
            </v-btn>

            <v-btn
                text
                @click="sendFriendRequestDeclined()"
            >
                Decline
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState, mapActions } from 'vuex'

  export default {
    name: 'AddFriendModal',

    props: {
      dialog: {
        type: Boolean,
        default: false
      },

      friend: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },

    data: () => ({
      socket: {}
    }),

    created() {
      this.socket = io(this.apiUrl)
    },

    computed: {
      ...mapState(['userId', 'apiUrl'])
    },

    methods: {
      ...mapActions(['getPendingFriends', 'getFriends']),

      sendFriendRequestAdded() {
        this.socket.emit('sendFriendRequestAdded', { userId: this.userId, friend: this.friend })
        this.$emit('close')
      },

      sendFriendRequestDeclined() {
        this.socket.emit('sendFriendRequestDeclined', { userId: this.userId, friend: this.friend })
        this.$emit('close')
      }
    }
  }
</script>
