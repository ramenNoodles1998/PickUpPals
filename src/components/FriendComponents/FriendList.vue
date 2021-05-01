<template>
  <div>
    <v-menu
      v-if="(friends && friends.length > 0) || (pendingFriends && pendingFriends.length > 0)"
      open-on-hover
      top
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-6"
          v-bind="attrs"
          color="white"
          x-large
          dark
          v-on="on"
        >
          <v-icon color="green">
            mdi-account-multiple
          </v-icon>
        </v-btn>
      </template>
  
      <v-list rounded>
        <v-list-item-group
          v-model="selectedItem"
          color="green"
        >
          <div 
            v-for="(friend, i) in friends"
            :key="friend._id"
          >
            <v-list-item @click="selectedFriend(friend, false)">
              <v-list-item-icon>
                <v-icon>
                  mdi-account
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="friend.username"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="i < friends.length - 1"></v-divider>
          </div>

          <div 
            v-for="(friend, i) in pendingFriends"
            :key="friend._id"
          >
            <v-list-item @click="selectedFriend(friend, true)">
              <v-list-item-icon>
                <v-icon color="green">
                  mdi-plus
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> {{ friend.username }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="i < friends.length - 1"></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'FriendList',

    data: () => ({
      selectedItem: null,
    }),

    computed: {
      ...mapState(['friends', 'pendingFriends'])
    },

    mounted() {
      this.findFriends()

      this.getPendingFriends()
    },

    methods: {
      ...mapActions(['findFriends', 'getPendingFriends']),

      ...mapMutations(['toggleFriendModal']),

      selectedFriend(friend, isPending) {
        if (isPending) {
          //open modal to accept friend request
          this.$emit('open-friend-modal', friend)
        } else {
          //redirect to account page of person
        }
      }
    }
  }
</script>

<style scoped>

</style>