<template>
    <div>
        <v-card
            v-if="posts.length > 0"
            class="mx-auto my-3"
            width="800"
            height="810"
            color="#d3d3d3"
            tile
        >
            <slot name="feed-header" />
            
            <v-card-text>
                <v-list
                    max-height="650"
                    class="overflow-y-auto"
                    color="#d3d3d3"
                >
                    <div 
                        v-for="post in posts"
                        :key="post._id"
                    >
                        <v-list-tile>
                            <v-list-tile-content>
                                <Post 
                                :post="post"
                                edit-post
                            />
                            </v-list-tile-content>
                        </v-list-tile>
                    </div>
                </v-list>
            </v-card-text>
        </v-card>

        <v-card
            v-else
            class="mx-auto my-3 text-center"
            width="800"
            height="810"
            color="#d3d3d3"
            dark
            tile
        >
            <slot name="feed-header"/>

            <div 
                v-for="i in 2"
                :key="i"
            >
                <v-sheet
                    color="#d3d3d3"
                    class="pa-3"
                    light
                >
                    <v-skeleton-loader
                        class="mx-auto"
                        max-width="500"
                        type="card"
                    ></v-skeleton-loader>
                </v-sheet>
            </div>
        </v-card>
    </div>
</template>

<script>
    import Post from './Post.vue'
    import { getUserPosts } from '../../services/FeedService.js'

    export default {
        name: 'Posts',

        components: {
            Post
        },

        data: () => ({
            socket: {},

            loading: true,
            posts: []
        }),

        async created() {
            this.posts = await getUserPosts()
            this.posts = this.posts.data
        }
    }
</script>

<style scoped>

</style>