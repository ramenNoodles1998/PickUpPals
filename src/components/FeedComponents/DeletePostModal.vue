

<template>
    <div>
        <v-dialog
            v-model="dialog"
            closable
            width="500"
            @click:outside="$emit('close')"
        >
            <v-card>
                <v-card-title class="headline font-weight-light green white--text mb-3">
                    Delete Post
                </v-card-title>

                <v-card-text class="body-1 font-weight-bold mt-3">
                    Are you sure you want to delete this post?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="font-weight-light"
                        color="red"
                        text
                        @click="deletePostMethod"
                    >
                        Confirm
                    </v-btn>

                    <v-btn
                        class="font-weight-light"
                        color="green"
                        text
                        @click="$emit('close')"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import io from 'socket.io-client'

  export default {
    name: 'DeletePostModal',

    props: {
        dialog: {
            type: Boolean,
            default: false
        },

        deletePost: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },

    data: () => ({
        socket: {}
    }),

    computed: {
        ...mapState(['apiUrl'])
    },

    created() {
        this.socket = io(this.apiUrl)
    },

    methods: {
        ...mapActions(['deletePostAction']),

        deletePostMethod() {
            this.deletePostAction({ postId: this.deletePost._id })
            this.socket.emit('sendUpdateFeed', { post: this.deletePost} )
            this.$emit('close')
        }
    }
  }
</script>

<style scoped>

</style>