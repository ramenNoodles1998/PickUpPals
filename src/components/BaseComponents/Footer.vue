<template>
    <v-footer
        color="green"
        padless
    >
        <v-container fluid>
            <div class="d-flex flex-row-reverse">
                <FriendList 
                    v-if="friends.length > 0 || pendingFriends.length > 0 || sentPendingFriends.length > 0"
                    @open-friend-modal="(emitFriend) => $emit('open-friend-modal', emitFriend)"
                    :friends="friends"
                    :pendingFriends="pendingFriends"
                    :sentPendingFriends="sentPendingFriends"
                />
            </div>

            <div class="d-flex justify-center ma-3">
                <div class="white--text">
                    2021 — <strong>PickUpPals</strong>
                </div>
            </div>
        </v-container>
    </v-footer>
</template>

<script>
import FriendList from '../FriendComponents/FriendList.vue'
import { mapState } from 'vuex'

  export default {
    name: 'Footer',

    components: {
        FriendList
    },
    
    computed: {
      ...mapState(['friends', 'pendingFriends', 'sentPendingFriends'])
    },
  }
</script>

<style scoped>

</style>