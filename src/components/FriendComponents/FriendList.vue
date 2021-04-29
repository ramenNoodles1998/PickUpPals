<template>
  <div>
    <v-menu
        v-if="friends && friends.length > 0"
        open-on-hover
        top
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="green--text"
            v-bind="attrs"
            x-large
            v-on="on"
          >
            Friends
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="friend in friends"
            :key="friend[0]._id"
          >
            <v-list-item-title class="green--text">{{ friend[0].username }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
    name: 'FriendList',

    computed: {
      ...mapState(['friends'])
    },

    mounted() {
      this.findFriends()
    },

    methods: {
      ...mapActions(['findFriends'])
    }
  }
</script>

<style scoped>

</style>