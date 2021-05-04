

<template>
    <div>
        <v-dialog
            v-model="dialog"
            closable
            width="500"
            @click:outside="$emit('close')"
        >
            <v-card>
                <v-card-title class="headline font-weight-light green white--text">
                    Delete Friend
                </v-card-title>

                <v-card-text class="body-1 font-weight-light green--text">
                    Are you sure you want to delete this Friend?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="font-weight-light"
                        color="red"
                        text
                        @click="deleteFriendMethod"
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

  export default {
    name: 'DeletePostModal',

    props: {
        dialog: {
            type: Boolean,
            default: false
        },

        deleteFriend: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },

    computed: {
        ...mapState(['userId'])
    },

    methods: {
        ...mapActions(['deleteFriendAction']),

        deleteFriendMethod() {
            this.deleteFriendAction({ friendId: this.deleteFriend._id })
            this.$emit('close')
            this.$router.push({path: `/accountPage/${this.userId}`, params: {accountId: this.userId}})
        }
    }
  }
</script>

<style scoped>

</style>