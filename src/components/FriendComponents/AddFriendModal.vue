<template>
  <div>
    <v-dialog
      v-model="dialog"
      color="green"
      max-width="500"
      @click:outside="$emit('close')"
    >
      <v-card>
        <v-card-title class="headline green white--text">
            Friend Request
        </v-card-title>

        <v-card-text class="subtitle-1 font-weight-black mt-2">
          {{ friend.username}} has sent you a friend request.
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green"
                text
                @click="$emit('accept', post)"
            >
                Accept
            </v-btn>

            <v-btn
                text
                @click="$emit('decline', post)"
            >
                Decline
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
    }
  }
</script>
