

<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>
                PickUpPals
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items v-if="!isLoggedIn">
                <v-btn icon>
                    <router-link to="/">
                    <v-icon>mdi-home</v-icon>
                    </router-link>
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items v-else>
                <v-btn icon>
                    <router-link to="/feedPage">
                    <v-icon>mdi-home</v-icon>
                    </router-link>
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items v-if="isLoggedIn">
                <v-btn text>
                    <router-link class="ma-3" to="/subPage">Subscriptions</router-link>
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items v-if="!isLoggedIn">
            <v-btn text>
                <router-link class="ma-3 router-link" to="/loginPage">Login</router-link>
            </v-btn>
            </v-toolbar-items>

            <v-toolbar-items v-else>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            {{ username }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-list-item-title>
                                <v-btn text>
                                    <router-link to="/account">Profile</router-link>
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-title>
                                <AddFriendModal />
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-title>
                                <v-btn
                                    text
                                    @click="logout"
                                >
                                    logout
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
    </div>  
</template>

<script>
    import { mapState } from 'vuex'
    import * as auth from '../services/AuthService.js'
    import AddFriendModal from './AddFriendModal.vue'

    export default {
        name: 'NavBar',

        components: {
            AddFriendModal
        },

        computed: {
            ...mapState([
                'username',
                'isLoggedIn'
            ])
        },

        methods: {
            logout() {
                auth.logout()
                this.$router.push('/')
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
  }
</style>