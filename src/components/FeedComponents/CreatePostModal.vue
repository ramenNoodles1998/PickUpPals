

<template>
    <div>
        <v-dialog
            v-model="dialog"
            closable
            width="500"
            @click:outside="$emit('close')"
        >
            <v-card>
                <v-card-title class="headline green white--text mb-3">
                    Create Post
                </v-card-title>

                <v-card-text>
                      <v-form 
                        class="mt-5"
                        v-model="valid"
                      >
                            <v-row>
                                <v-textarea
                                    v-model="post.description"
                                    label="Description"
                                    outlined
                                ></v-textarea>
                            </v-row>

                            <v-row>
                                <v-select
                                    v-model="post.sport"
                                    label="Sport"
                                    :items="sports"
                                    item-text="title"
                                    item-value="title"
                                    outlined
                                ></v-select>
                            </v-row>
                            
                            <v-row>
                                <v-text-field
                                    v-model="post.location"
                                    label="Address"
                                    outlined
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-text-field 
                                    v-model="post.spotsAvailable"
                                    outlined
                                    type="number" 
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
import { getSubscriptionSports } from '../../services/FeedService'

  export default {
    name: 'CreatePostModal',

    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        socket: {},
        valid: true,
        sports: [],
        post: {
            description: '',
            sport: '',
            spotsAvailable: 0,
            location: ''
        }
    }),

    computed: {
        ...mapState(['userId', 'username'])
    },

    async mounted() {
        this.post = {
            creatorUsername: this.username,
            creatorId: this.userId,
            ...this.post
        }

        let sports = await getSubscriptionSports()
        this.sports = sports.data
    }
  }
</script>

<style scoped>

</style>