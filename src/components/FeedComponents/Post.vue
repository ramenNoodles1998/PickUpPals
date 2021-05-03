<template>
  <div>
    <v-card
      class="mx-auto my-3"
      max-width="600"
      color="green"
      dark
    >

      <v-card-title>
        <v-icon
          large
          left
        >
          mdi-soccer
        </v-icon>
        <span class="title font-weight-light">PickUpPals</span>
      </v-card-title>
      
      <v-card-text class="headline font-weight-light">
        {{ post.description }}
      </v-card-text>

      <v-card-text class="subtitle-1 font-weight-light">
        {{ post.sport }} at {{ post.address }} on {{ dateTimeComputed }}
      </v-card-text>

      <v-card-actions v-if="editPost">
        <v-list-item class="grow">
          <v-row
            align="center"
            justify="end"
          >
            <v-col align="left">
              <v-list-item>
                <v-list-item-title class="font-weight-light">
                  {{ post.creatorUsername }}
                </v-list-item-title>
              </v-list-item>
            </v-col>

            <v-col>
              <v-list-item>
                <v-list-item-title class="font-weight-light">
                  Spots Left: {{ post.spotsAvailable }}
                </v-list-item-title>
              </v-list-item>
            </v-col>

            <v-col align="right">
              <v-btn
                class="mr-2"
                color="white"
                outlined
                small
                fab
                @click="editPostMethod"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>

              <v-btn
                color="error"
                outlined
                small
                fab
                @click="deletePost"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-card-actions>

      <v-card-actions v-else>
        <v-row
          align="center"
          justify="end"
        >
          <v-col align="left">
            <v-list-item class="font-weight-light">
              <v-list-item-title>
                {{ post.creatorUsername }}
              </v-list-item-title>
            </v-list-item>
          </v-col>

          <v-col>
            <v-list-item>
              <v-list-item-title class="font-weight-light">
                Spots Left: {{ post.spotsAvailable }}
              </v-list-item-title>
            </v-list-item>
          </v-col>

          <v-col align="right">
            <v-btn
              class="green--text font-weight-light"
              color="white"
              medium
              @click="joinPost"
            >
              join game
            </v-btn>
          </v-col>
        </v-row>
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

    mounted() {
      this.socket.on(`joinedGame/${this.userId}`, async ({ game }) => {
        await this.getGames()
        this.$router.push('/gamesPage')
        this.socket.emit('decreaseSpots', { game })
      })
    },

    computed: {
      ...mapState(['apiUrl', 'userId']),

      dateTimeComputed() {
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(this.post.dateTime))
      }
    },

    methods: {
      ...mapActions(['getGames']),

      joinPost() {
        this.socket.emit('joinGame', { userId: this.userId, post: this.post })
      },

      deletePost() {
        this.$emit('delete-post', this.post)
      },

      editPostMethod() {
        this.$emit('edit-post', this.post)
      }
    }
  }
</script>

<style scoped>

</style>