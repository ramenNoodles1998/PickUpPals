<template>
  <div>
    <v-menu
      v-if="(friends && friends.length > 0) || (pendingFriends && pendingFriends.length > 0) || (sentPendingFriends && sentPendingFriends.length > 0)"
      top
      rounded
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-7"
          v-bind="attrs"
          color="white"
          x-large
          dark
          fab
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
          <v-list-item
            v-if="friends.length > 0"
            class="green white--text font-weight-light" 
            disabled
          >
              Friends
          </v-list-item>
          
          <div 
            v-for="(friend, i) in friends"
            :key="friend._id"
          >
            <v-divider v-if="i !== 0"></v-divider>

            <v-list-item @click="selectedFriend(friend, false)">
              <v-list-item-content>
                <v-list-item-title class="font-weight-light">
                  {{ friend.username }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon>
                  mdi-account
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </div>

          <v-list-item
            v-if="pendingFriends.length > 0 || sentPendingFriends.length > 0"
            class="green white--text font-weight-light" 
            disabled
          >
            Pending Friends
          </v-list-item>

          <div 
            v-for="(friend, i) in pendingFriends"
            :key="friend._id"
          >
            <v-divider v-if="i !== 0"></v-divider>

            <v-list-item @click="selectedFriend(friend, true)">
              <v-list-item-content>
                <v-list-item-title class="font-weight-light"> 
                  {{ friend.username }}
                </v-list-item-title>
              </v-list-item-content>
                            
              <v-list-item-icon>
                <v-icon color="green">
                  mdi-plus
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </div>

          <div 
            v-for="(friend, i) in sentPendingFriends"
            :key="friend._id"
          >
            <v-divider v-if="i !== 0"></v-divider>

            <v-list-item @click="selectedFriend(friend, false)">
              <v-list-item-content>
                <v-list-item-title v-text="friend.username" class="font-weight-light">
                  {{ friend.username }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon>
                  mdi-account
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: 'FriendList',

    props: {
      friends: {
        type: Array,
        default: () => {
          return []
        }
      },

      pendingFriends: {
        type: Array,
        default: () => {
          return []
        }
      },

      sentPendingFriends: {
        type: Array,
        default: () => {
          return []
        }
      }
    },

    data: () => ({
      selectedItem: null,
    }),


    methods: {
      selectedFriend(friend, isPending) {
        if (isPending) {
          //open modal to accept friend request
          this.$emit('open-friend-modal', friend)
        } else if (this.$route.params.accountId !== friend._id) {
          //redirect to account page of person
          this.$router.push({
            path: `/accountPage/${friend._id}`, 
            params: { account: friend }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>