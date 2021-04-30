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
            
            <v-list
                max-height="650"
                class="overflow-y-auto"
                color="#d3d3d3"
            >
                <div 
                    v-for="post in posts"
                    :key="post._id"
                >
                    <Post :post="post"/>
                </div>
            </v-list>
            
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
    import {mapState} from 'vuex'
    import Post from './Post.vue'

    export default {
        name: 'Feed',

        components: {
            Post
        },

        computed: {
            ...mapState({
                posts: 'allPosts'
            })
        }
    }
</script>

<style scoped>

</style>