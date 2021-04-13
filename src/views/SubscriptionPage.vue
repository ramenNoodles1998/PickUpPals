<template>
    <div>
      <v-dialog
        v-model="errorModal"
        width="300"
      >
        <v-card>
          <v-card-title class="headline red lighten-2">
            Error
          </v-card-title>
  
          <v-card-text>
            {{errorMessage}}
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              text
              @click="errorModal = false"
            >
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card
        class="mx-auto my-4"
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
            return-object
          ></v-select>
        </v-list-item>

        <v-card-actions>
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
          <v-btn 
            color="error"
            @click="deleteSubscription(subscription._id)"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
  import * as sub from '../services/SubscriptionService.js'
  import { mapState } from 'vuex'

  export default {
    name: 'SubscriptionPage',

    data: () => ({
      errorModal: false,
      errorMessage: '',

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
      console.log(this.subscriptions)
    },

    methods: {
      async addSubscription() {
        if (this.userSubscriptions.filter(s => s._id === this.selectedSubscription.item._id).length === 0) {
          let res = await sub.addUserSubscription(this.userId, this.selectedSubscription.item._id)

          if(res.status == 200) {
           this.userSubscriptions.push(this.selectedSubscription.item)
          } else {
            this.errorModal = true
            this.errorMessage = 'Error adding subscription try again.'
          }
        } else {
            this.errorModal = true
            this.errorMessage = 'Can\'t add existing subscription.'
        }
      },

      async deleteSubscription(subscriptionId) {
        let res = await sub.deleteUserSubscription(this.userId, subscriptionId)

        if(res.status == 200) {
          this.userSubscriptions.splice(this.userSubscriptions.indexOf(subscriptionId), 1)
        } else {
          this.errorModal = true
          this.errorMessage = 'Error deleting subscription try again.'
        }
      }
    },

    
  }
</script>
