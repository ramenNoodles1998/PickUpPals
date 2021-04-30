<template>
  <div>
    <v-card
      class="mx-auto my-3"
      max-width="600"
      color="green"
      dark
      tile
    >
      <v-list-item>
          <v-list-item-title class="display-2">
              <strong>{{ post.creatorUsername }}</strong>
            </v-list-item-title>
      </v-list-item>
  
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="display-1">
              <strong>{{ post.sport }}</strong>
            </v-list-item-title>
          <v-list-item-title>{{ post.description }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
            <v-list-item-title>
                <strong>Address:</strong> 
                {{ post.address }}
            </v-list-item-title>
      </v-list-item>

      <v-list-item>
          <v-list-item-title>
              <strong>Number of Spots Left:</strong> 
              {{ post.spotsAvailable }}
            </v-list-item-title>
      </v-list-item>

      <v-list-item>
          <v-list-item-title>
              <strong>Game Time:</strong> 
              {{ dateTimeComputed }}
            </v-list-item-title>
      </v-list-item>

      <v-card-actions v-if="editPost">
        <v-spacer></v-spacer>

        <v-btn
          color="white"
          outlined
          medium
          fab
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        
        <v-btn
          color="error"
          outlined
          medium
          fab
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
    </v-card-actions>

    <v-card-actions v-else>
        <v-spacer></v-spacer>
        
        <v-btn
          class="green--text"
          color="white"
          large
          @click="joinPost"
        >
          join
        </v-btn>
    </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import io from 'socket.io-client'

  export default {
    name: 'Post',
    
    props: {
        post: {
          type: Object,
          default: () => {
              return {}
          }
        },

        editPost: {
          type: Boolean,
          default: false
        }
    },

    data: () => ({
      socket: {}
    }),

    created() {
      this.socket = io(this.apiUrl)
    },

    computed: {
      ...mapState(['apiUrl', 'userId']),

      dateTimeComputed() {
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(this.post.dateTime))
      },

      googleLink() {
        let address = this.post.address.split(' ')

        return `https://www.google.com/maps?saddr=My+Location&daddr=${address.join('+')}+${this.post.city}+${this.post.state}+${this.post.zip}`
      }
    },

    methods: {
      ...mapActions(['joinGame']),

      joinPost() {
        //decrease spots left and add to current games
        this.joinGame({ post: this.post })
        this.socket.emit('joinGame', { userId: this.userId, post: this.post })
        this.$router.push('/gamesPage')
      }
    }
  }
</script>

<style scoped>

</style>