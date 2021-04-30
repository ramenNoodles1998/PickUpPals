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
              <strong>{{ game.creatorUsername }}</strong>
            </v-list-item-title>
      </v-list-item>
  
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="display-1">
              <strong>{{ game.sport }}</strong>
            </v-list-item-title>
          <v-list-item-title>{{ game.description }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
            <v-list-item-title>
                <strong>Address:</strong> 
                {{ game.address }}
            </v-list-item-title>
      </v-list-item>

      <v-list-item>
          <v-list-item-title>
              <strong>Number of Spots Left:</strong> 
              {{ game.spotsAvailable }}
            </v-list-item-title>
      </v-list-item>

      <v-list-item>
          <v-list-item-title>
              <strong>Game Time:</strong> 
              {{ dateTimeComputed }}
            </v-list-item-title>
      </v-list-item>

    <v-card-actions>
        <v-spacer></v-spacer>
        
        <v-btn
          class="green--text"
          color="white"
          large
          @click="goToDirections"
        >
          directions
        </v-btn>
    </v-card-actions>
    </v-card>
  </div>
</template>

<script>
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
      goToDirections() {
        window.open(this.googleLink,'_newtab')
      }
    }
  }
</script>

<style scoped>

</style>