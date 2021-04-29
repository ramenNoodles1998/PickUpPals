

<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="500"
            @click:outside="$emit('close')"
        >
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Add Friend
                </v-card-title>

                <v-card-text>
                    <v-autocomplete
                        v-model="selectedFriend"
                        :items="users"
                        :loading="isLoading"
                        :search-input.sync="search"
                        hide-no-data
                        hide-selected
                        item-text="username"
                        label="Search for Friend."
                        prepend-icon="mdi-account-search"
                        return-object
                    >
                        <template #append-outer>
                            <v-btn 
                                color="green"
                                dark
                                @click="addFriend()"
                            >
                                <v-icon>
                                    mdi-account-plus
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-autocomplete>
                </v-card-text>
            </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { getFriendsList, addFriend } from '../../services/FeedService.js'
import { mapActions } from 'vuex'

  export default {
    name: 'AddFriendModal',

    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        limit: 60,
        selectedFriend: null,
        isLoading: false,
        users: [],
        search: null
    }),

    computed: {
        items() {
            return this.users.map(user => {
                const User = user.username.length > this.limit
                ? user.username.slice(0, this.limit) + '...'
                : user.username

                return Object.assign({}, user, { User })
            })
        },
    },

    watch: {
        async search() {
            if (this.items.length > 0) return

            if (this.isLoading) return

            this.isLoading = true

            let foundUsers = await getFriendsList()
        
            this.users = foundUsers.data
            this.count = foundUsers.data.length

            this.isLoading = false
        },
    },


    methods: {
      ...mapActions(['findFriends']),

        async addFriend() {
            if(this.selectedFriend) {
                try {
                    await addFriend(this.selectedFriend.username)
                    this.findFriends()
                    this.$emit('success-toast')
                } catch(e) {
                    this.$emit('error-toast')
                }
            }
        }
    }
  }
</script>

<style scoped>

</style>