

<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="500"
            @click:outside="$emit('close')"
        >
            <v-card>
                <v-card-text>
                      <v-form 
                        v-model="valid"
                      >
                            <v-row>
                                <v-card width="450" class="my-5">
                                    <v-card-title class="headline green white--text">
                                        Create Post
                                    </v-card-title>
                                </v-card>
                            </v-row>

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
                                    v-model="post.spotsAvailable"
                                    outlined
                                    type="number" 
                                    label="Spots Available" 
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-menu
                                    ref="menuDialog"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="post.date"
                                            label="Game Time"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>

                                    <v-date-picker
                                        ref="picker"
                                        v-model="post.date"
                                        color="green"
                                        :min="new Date().toISOString().substr(0, 10)"
                                        @change="save"
                                    ></v-date-picker>
                                </v-menu>
                            </v-row>

                            <v-row>
                                <v-dialog
                                    ref="timepickerdialog"
                                    v-model="timepicker"
                                    :return-value.sync="post.time"
                                    persistent
                                    width="290px"
                                >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="post.time"
                                                label="Game Time"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>

                                        <v-time-picker
                                            v-if="timepicker"
                                            v-model="post.time"
                                            color="green"
                                            full-width
                                        >

                                        <v-spacer></v-spacer>

                                        <v-btn
                                            text
                                            @click="timepicker = false"
                                        >
                                            Cancel
                                        </v-btn>

                                        <v-btn
                                            text
                                            color="green"
                                            @click="$refs.timepickerdialog.save(post.time)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-row>

                            <v-row class="mb-5">
                                <v-card width="475">
                                    <v-card-title class="headline green white--text">
                                        Game Location
                                    </v-card-title>
                                </v-card>
                            </v-row>

                            <v-row>
                                <v-text-field
                                    v-model="post.address"
                                    label="Street Address"
                                    outlined
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-text-field
                                    v-model="post.city"
                                    label="City"
                                    outlined
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-text-field
                                    v-model="post.state"
                                    label="State"
                                    outlined
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-text-field
                                    v-model="post.zip"
                                    label="Zip Code"
                                    outlined
                                ></v-text-field>
                            </v-row>
                    </v-form>
                </v-card-text>


                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green"
                        text
                        @click="sendPost"
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
        date: null,
        timepicker: false,
        menu: false,

        post: {
            description: '',
            sport: '',
            spotsAvailable: 0,
            address: '',
            city: '',
            state: '',
            zip: 0,
            date: null,
            time: null
        }
    }),

    computed: {
        ...mapState(['userId', 'username'])
    },

    async mounted() {
        let sports = await getSubscriptionSports()
        this.sports = sports.data
    },

    watch: {
        menu (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
    },

    methods: {
        save(date) {
            this.$refs.menuDialog.save(date)
        },

        sendPost() {
            this.$emit('on-post', {
                creatorUsername: this.username,
                creatorId: this.userId,
                description: this.post.description,
                sport: this.post.sport,
                spotsAvailable: this.post.spotsAvailable,
                address: this.post.address,
                city: this.post.city,
                state: this.post.state,
                zip: this.post.zip,
                dateTime: this.post.date + ' ' + this.post.time
            })
        }
    }
  }
</script>

<style scoped>

</style>