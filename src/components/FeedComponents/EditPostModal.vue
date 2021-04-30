

<template>
    <div>
        <v-dialog
            v-model="dialog"
            closable
            width="500"
            @click:outside="$emit('close')"
        >
            <v-card>
                <v-card-title class="headline green white--text">
                    Edit Post
                </v-card-title>

                <v-card-text>
                      <v-form 
                        class="m-3"
                        v-model="valid"
                      >
                            <v-row>
                                <!--TODO: change to multiline -->
                                <v-text-field
                                    v-model="post.description"
                                    label="Description"
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <!--TODO: change to select -->
                                <v-text-field
                                    v-model="post.sport"
                                    label="Sport"
                                ></v-text-field>
                            </v-row>

                            
                            <v-row>
                                <!--TODO: change to number up and down -->
                                <v-text-field
                                    v-model="post.address"
                                    label="Address"
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <!--TODO: change to number up and down -->
                                <v-text-field
                                    v-model="post.spotsAvailable"
                                    label="Spots Available"
                                ></v-text-field>
                            </v-row>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green"
                        text
                        @click="$emit('on-post', post)"
                    >
                        Post
                    </v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'EditPostModal',

    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        socket: {},
        valid: true,
        post: {
            description: '',
            sport: '',
            spotsAvailable: 0,
            address: ''
        }
    }),

    computed: {
        ...mapState(['userId', 'username'])
    },

    mounted() {
        this.post = {
            creatorUsername: this.username,
            creatorId: this.userId,
            ...this.post
        }
    }
  }
</script>

<style scoped>

</style>