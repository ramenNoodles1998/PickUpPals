<template>
    <div>
      <v-card
        class="mx-auto my-3" 
        height="810"
        width="800"
        color="#d3d3d3"
      >
        <v-list
          max-height="810"
          class="overflow-y-auto"
          color="#d3d3d3"
        >
          <v-card
            class="mx-auto my-3"
            max-width="500"
          >
            <v-card-title>
              Subscribe To New Sports
            </v-card-title>

            <v-list-item>
              <v-select
                v-model="selectedSubscription.item"
                :items="subscriptions"
                item-text="title"
                label="Available Subscriptions"
                no-data-text="You are subscribed to all the sports."
                return-object
              ></v-select>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="success"
                @click="addSubscription()"
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card
            v-for="subscription in userSubscriptions"
            :key="subscription._id"
            class="mx-auto my-4"
            max-width="500"
          >
            <v-list subheader>
              <v-subheader>Current Subscription</v-subheader>
      
              <v-list-item width="400">
                <v-list-item-content>
                  <v-list-item-title v-text="subscription.title"></v-list-item-title>
                </v-list-item-content>
        
                <v-list-item-icon>
                  <v-icon v-text="subscription.icon">
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn 
                color="error"
                @click="deleteSubscription(subscription._id)"
              >
                delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-list>
      </v-card>
    </div>
</template>

<script>
  import * as sub from '../services/SubscriptionService.js'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'SubscriptionPage',

    data: () => ({
      selectedSubscription: {},

      subscriptions: [],

      userSubscriptions: []
    }),

    computed: {
      ...mapState(['userId'])
    },

    async mounted() {
      let subscriptions = await sub.getSubscriptions()
      let userSubscriptions = await sub.getUserSubscriptions(this.userId)
      this.userSubscriptions = userSubscriptions.data
      this.subscriptions = subscriptions.data
    },

    methods: {
      ...mapActions(['getAllPosts']),

      async addSubscription() {
        if (this.userSubscriptions.filter(s => s._id === this.selectedSubscription.item._id).length === 0) {
          await sub.addUserSubscription(this.userId, this.selectedSubscription.item._id)
          let subscriptions = await sub.getSubscriptions()
          this.subscriptions = subscriptions.data
          this.userSubscriptions.push(this.selectedSubscription.item)
          this.getAllPosts()
        }
      },

      async deleteSubscription(subscriptionId) {
        await sub.deleteUserSubscription(this.userId, subscriptionId)
        this.userSubscriptions.splice(this.userSubscriptions.indexOf(subscriptionId), 1)
        let subscriptions = await sub.getSubscriptions()
        this.subscriptions = subscriptions.data
        this.getAllPosts()
      }
    },

    
  }
</script>
