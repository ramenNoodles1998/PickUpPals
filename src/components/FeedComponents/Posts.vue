<template>
    <div>
        <DeletePostModal 
            v-if="deletePost"
            :dialog="deletePostModal"
            :deletePost="deletePost"
            @close="deletePostModal = false"
        />

        <EditPostModal 
            v-if="editPost !== null"
            :dialog="editPostModal"
            :editPost="editPost"
            @close="editPostModal = false"
        />

        <v-card
            v-if="userPosts.length > 0"
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
                        v-for="post in userPosts"
                        :key="post._id"
                    >
                        <v-list-item-content>
                            <Post 
                                :post="post"
                                edit-post
                                @delete-post="openDeletePostModal"
                                @edit-post="openEditPostModal"
                            />
                        </v-list-item-content>
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
    import DeletePostModal from './DeletePostModal'
    import EditPostModal from './EditPostModal'

    import { mapActions, mapState } from 'vuex'

    export default {
        name: 'Posts',

        components: {
            Post,
            DeletePostModal,
            EditPostModal
        },

        data: () => ({
            socket: {},

            loading: true,
            deletePostModal: false,
            editPostModal: false,
            deletePost: null,
            editPost: null
        }),

        computed: {
            ...mapState(['userPosts'])
        },

        created() {
            this.getUserPosts()
        },

        methods: {
            ...mapActions(['getUserPosts']),

            openDeletePostModal(post) {
                this.deletePostModal = true
                this.deletePost = post
            },

            openEditPostModal(post) {
                this.editPost = post

                this.editPostModal = true
            }
        }
    }
</script>

<style scoped>

</style>