<template>
  <div>
    <v-card
      class="mx-auto my-3"
      max-width="400"
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
                {{ post.location }}
            </v-list-item-title>
      </v-list-item>

      <v-list-item>
          <v-list-item-title>
              <strong>Number of Spots Left:</strong> 
              {{ post.spotsAvailable }}
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
    </v-card>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped>

</style>