

<template>
    <div>
        <v-dialog
            v-model="dialog"
            closable
            width="500"
            @click:outside="$emit('close')"
        >
            <v-card color="#d3d3d3">
                <v-card-title class="headline font-weight-light green white--text">
                    Delete Post
                </v-card-title>

                <v-card-text class="headline font-weight-light green--text">
                    Are you sure you want to delete this post?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="font-weight-light"
                        color="green"
                        text
                        @click="deletePostMethod"
                    >
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

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

    }),

    computed: {
    },

    methods: {
        ...mapActions(['deletePostAction']),

        deletePostMethod() {
            this.deletePostAction({ postId: this.deletePost._id })
            this.$emit('close')
        }
    }
  }
</script>

<style scoped>

</style>