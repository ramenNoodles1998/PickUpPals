<template>
  <div>
    <v-card
      class="mx-auto my-3"
      max-width="600"
      color="green"
      dark
    >

      <v-card-title>
        <v-row justify="space-between">
          <div>
            <v-icon
              large
              left
            >
              mdi-soccer
            </v-icon>
            <span class="title font-weight-light">PickUpPals</span>
          </div>

          <v-btn
            @click="leaveGame"
            icon
          >
            <v-icon
              medium
              left
            >
              mdi-close
            </v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      
      <v-card-text class="headline font-weight-light">
        {{ game.description }}
      </v-card-text>

      <v-card-text class="subtitle-1 font-weight-light">
        {{ game.sport }} at {{ game.address }} on {{ dateTimeComputed }}
      </v-card-text>
  
      <v-card-actions>
        <v-row
          align="center"
          justify="end"
        >
          <v-col align="left">
            <v-list-item class="font-weight-light">
              <v-list-item-title>
                {{ game.creatorUsername }}
              </v-list-item-title>
            </v-list-item>
          </v-col>

          <v-col>
            <v-list-item>
              <v-list-item-title class="font-weight-light">
                Spots Left: {{ game.spotsAvailable }}
              </v-list-item-title>
            </v-list-item>
          </v-col>
          
          <v-col>
            <v-btn
              class="green--text font-weight-light"
              color="white"
              medium
              @click="goToDirections"
            >
              directions
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Game',
    
    props: {
        game: {
          type: Object,
          default: () => {
            return {}
          }
        },

        directions: {
          type: Boolean,
          default: false
        }
    },

    computed: {
      dateTimeComputed() {
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(this.game.dateTime))
      },

      googleLink() {
        let address = this.game.address.split(' ')

        return `https://www.google.com/maps?saddr=My+Location&daddr=${address.join('+')}+${this.game.city}+${this.game.state}+${this.game.zip}`
      }
    },

    methods: {
      ...mapActions(['leaveGameAction']),

      goToDirections() {
        window.open(this.googleLink,'_newtab')
      },

      leaveGame() {
        this.leaveGameAction({ gameId: this.game._id })
      }
    }
  }
</script>

<style scoped>

</style>