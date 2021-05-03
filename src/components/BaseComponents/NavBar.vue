<template>
    <div>
        <SearchFriendModal
            :dialog="openFriendModal"
            @close="openFriendModal = false"
        />

        <v-toolbar>
            <v-btn 
                class="green--text"
                text
                @click="goTo('/')"
            >
                <v-icon
                    large
                    left
                >
                    mdi-soccer
                </v-icon>

                <span class="title font-weight-light">
                    PickUpPals
                </span>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn 
                v-if="!isLoggedIn"
                class="green--text"
                icon
                @click="goTo('/')"
            >
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <v-btn 
                v-else
                class="green--text"
                icon
                @click="goTo('/feedPage')"
            >
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <v-btn 
                v-if="isLoggedIn && games.length > 0"
                class="green--text font-weight-light"
                text
                @click="goTo('/gamesPage')"
            >
                Games
            </v-btn>

            <v-btn 
                v-if="isLoggedIn"
                class="green--text font-weight-light"
                text
                @click="goTo('/subPage')"
            >
                Subscriptions
            </v-btn>

            <v-btn 
                v-if="!isLoggedIn"
                class="green--text font-weight-light"
                text
                @click="goTo('/loginPage')"
            >
                Login
            </v-btn>

            <div v-else>
                <v-menu 
                    open-on-hover
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="font-weight-light"
                            text
                            v-bind="attrs"
                            v-on="on"
                        >
                            {{ username }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="goTo({path: `/accountPage/${userId}`, params: {accountId: userId}})">
                            <v-list-item-title class="font-weight-light">
                                Profile
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="openFriendModal = true">
                            <v-list-item-title class="font-weight-light">
                                Add Friend
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="logout">
                            <v-list-item-title class="font-weight-light">
                                Logout
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-toolbar>
    </div>  
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import * as auth from '../../services/AuthService.js'
    import SearchFriendModal from '../FriendComponents/SearchFriendModal'

    export default {
        name: 'NavBar',

        components: {
            SearchFriendModal
        },

        data: () => ({
            snackbar: false,
            snackbarText: '',
            snackbackColor: 'green',
            openFriendModal: false
        }),

        computed: {
            ...mapState([
                'username',
                'isLoggedIn',
                'games',
                'userId'
            ])
        },

        mounted() {
            this.getGames()
        },

        methods: {
            ...mapActions(['getGames']),

            logout() {
                auth.logout()
                this.$router.push('/')
            },

            goTo(route) {
                this.$router.push(route)
            }
        },

        beforeCreate() {
            this.$store.dispatch('authenticate')
        }
    }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: green;
  }
</style>