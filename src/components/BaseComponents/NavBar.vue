<template>
    <div>
        <v-snackbar 
            v-model="snackbar"
            :color="snackbackColor"
        >
            {{ snackbarText }}
        </v-snackbar>

        <AddFriendModal
            @success-toast="openSuccessToast"
            @error-toast="openErrorToast"
            :dialog="openFriendModal"
            @close="openFriendModal = false"
        />

        <v-toolbar>
            <v-btn 
                class="green--text"
                text
                @click="goTo('/')"
            >
                PickUpPals
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
                v-if="isLoggedIn"
                class="green--text"
                text
                @click="goTo('/subPage')"
            >
                Subscriptions
            </v-btn>

            <v-btn 
                v-if="!isLoggedIn"
                class="green--text"
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
                            text
                            v-bind="attrs"
                            v-on="on"
                        >
                            {{ username }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="goTo('/account')">
                            <v-list-item-title>
                                Profile
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="openFriendModal = true">
                            <v-list-item-title>
                                Add Friend
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="logout">
                            <v-list-item-title>
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
    import { mapState } from 'vuex'
    import * as auth from '../../services/AuthService.js'
    import AddFriendModal from '../FriendComponents/AddFriendModal.vue'

    export default {
        name: 'NavBar',

        components: {
            AddFriendModal
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
                'isLoggedIn'
            ])
        },

        methods: {
            openSuccessToast() {
                this.snackbarText = 'Successfully added friend.'
                this.snackbar = true
            },

            openErrorToast() {
                this.snackbarText = 'Error adding friend.'
                this.snackbar = true
                this.snackbackColor = 'red'
            },

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