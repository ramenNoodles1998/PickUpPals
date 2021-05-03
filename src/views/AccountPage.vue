<template>
    <div>
        <EditProfileModal 
            :dialog="editProfileModal"
            :profile="account"
            @close="editProfileModal = false"
        />

        <v-card
            class="mx-auto my-6"
            max-width="800"
            min-height="800"
            color="white"
            dark
        >
            <v-row justify="center">
                <v-card-title>
                    <v-icon
                        class="m-2"
                        color="green"
                        large
                        left
                    >
                        mdi-account
                    </v-icon>

                    <span class="font-weight-light green--text m-2">{{ account.username }}</span>

                    <v-btn 
                        v-if="profile"
                        class="font-weight-light m-2"
                        color="green"
                        small
                        text
                        @click="editProfileModal = true"
                    >
                        Edit Profile
                    </v-btn>
                </v-card-title>
            </v-row>
            
            <v-row justify="center">
                <v-card-title>
                    <span class="font-weight-light green--text">{{ account.first }} {{ account.last }}</span>
                </v-card-title>

                <v-card-title>
                    <span class="font-weight-light green--text">{{ account.friends && account.friends.length }} friend(s)</span>
                </v-card-title>

                <v-card-title>
                    <span class="font-weight-light green--text">{{ account.currentGames && account.currentGames.length }} game(s)</span>
                </v-card-title>
            </v-row>

            <v-toolbar 
                class="d-flex justify-center my-2"
                color="green"
                dark
            >
                <v-toolbar-items>
                    <v-btn 
                        class="font-weight-light"
                        text
                        @click="recentPostPage = true"
                    >
                        Recent Posts
                    </v-btn>
                </v-toolbar-items>

                <v-toolbar-items>
                    <v-btn 
                        class="font-weight-light"
                        text
                        @click="recentPostPage = false"
                    >
                        Current Games
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <div v-if="recentPostPage">
                <v-row
                    class="mt-3"
                    justify="center"
                    v-for="(post, i) in account.recentPosts"
                    :key="i"
                >
                    <Post 
                        :post="post" 
                        :edit-post="profile"
                    />
                </v-row>
            </div>

            <div v-else>
                <v-row
                    class="mt-3"
                    justify="center"
                    v-for="(game, i) in account.recentGames"
                    :key="i"
                >
                    <Game 
                        :game="game"
                    />
                </v-row>
            </div>
        </v-card>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { findAccount } from '../services/AccountService.js'
    import Post from '../components/FeedComponents/Post.vue'
    import Game from '../components/GamesComponents/Game.vue'
    import EditProfileModal from '../components/AccountComponents/EditProfileModal.vue'

    export default {
        name: 'AccountPage',

        components: {
            Post,
            Game,
           EditProfileModal
        },

        data: () => ({
            account: {},
            recentPostPage: true,
            editProfileModal: false,
            profile: false
        }),

        computed: {
            ...mapState(['userId'])
        },

        watch: {
            async '$route' (route) {
                let res = await findAccount({accountId: route.params.accountId})
                
                this.account = res.data

                if (this.account._id === this.userId) {
                    this.profile = true
                }
            }
        },

        beforeRouteEnter(to, from, next) {
            next(async vm => {
                let res = await findAccount({accountId: vm.$route.params.accountId})

                vm.account = res.data

                if (vm.account._id === vm.userId) {
                    vm.profile = true
                }
            })
        }
    }
</script>

<style scoped>

</style>