<template>
  <div>
    <CreatePostModal 
      :dialog="openCreatePostModal"
      @close="openCreatePostModal = false"
      @on-post="sendPost"
    />

    <EditPostModal
      :dialog="openEditPostModal"
      @close="openEditPostModal = false"
    />

    <div class="d-flex flex-row justify-center">
        <div v-if="onFeedPage">
          <Feed>
            <template v-slot:feed-header>
              <FeedHeader 
                @your-post-clicked="swithPagePosts"
                @your-feed-clicked="switchPageFeed"
              />
            </template>
          </Feed>
        </div>

        <div v-else>
          <Posts>
            <template v-slot:feed-header>
              <FeedHeader 
                @your-post-clicked="swithPagePosts"
                @your-feed-clicked="switchPageFeed"
              />
            </template>
          </Posts>
        </div>

        <div class="ml-4 mt-3">
          <v-btn 
            class="green--text"
            text
            x-large
            @click="openCreatePostModal = true"
          >
            post
            <v-icon right>
              mdi-plus-circle
            </v-icon>
          </v-btn>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import io from 'socket.io-client'
import CreatePostModal from '../components/FeedComponents/CreatePostModal.vue'
import EditPostModal from '../components/FeedComponents/EditPostModal.vue'
import FeedHeader from '../components/FeedComponents/FeedHeader.vue'
import Feed from '../components/FeedComponents/Feed.vue'
import Posts from '../components/FeedComponents/Posts.vue'

  export default {
    name: 'FeedPage',

    components: {
      Feed,
      CreatePostModal,
      EditPostModal,
      FeedHeader,
      Posts
    },

    data: () => ({
      socket: {},
      onFeedPage: true,
      openEditPostModal: false,
      openCreatePostModal: false
    }),

    computed: {
      ...mapState(['userId', 'apiUrl', 'allPosts'])
    },

    created() {
      this.socket = io(this.apiUrl)
    },

    async mounted() {
      this.getAllPosts()

      this.socket.on(`friendPost/${this.userId}`, ({post}) => {
        this.allPosts.push(post)
      })
    },

    methods: {
      ...mapActions(['getAllPosts']),

      sendPost(post) {
        this.openCreatePostModal = false
        this.socket.emit('onPost', { post })
      },

      swithPagePosts() {
        this.onFeedPage = false
      },

      switchPageFeed() {
        this.onFeedPage = true
      }
    }
  }
</script>

<style scoped>

</style>
