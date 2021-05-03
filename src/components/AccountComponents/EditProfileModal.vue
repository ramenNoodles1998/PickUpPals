

<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="600"
            @click:outside="$emit('close')"
        >
            <v-card>
                <v-form 
                    ref="form"
                    v-model="valid"
                >
                    <v-container>
                        <v-row
                            align="center"
                            justify="center"
                        >
                            <div class="display-1 green--text mt-5">Edit Profile</div>
                        </v-row>
                    
                        <v-row
                            align="center"
                            justify="center"
                        >
                            <v-col
                                cols="12"
                                md="8"
                            >
                                <v-text-field
                                v-model="profile.username"
                                :rules="usernameRules"
                                label="Username"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row
                            align="center"
                            justify="center"
                        >
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <v-text-field
                                v-model="profile.first"
                                :rules="nameRules"
                                label="First Name"
                                ></v-text-field>
                            </v-col>
                
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <v-text-field
                                v-model="profile.last"
                                :rules="nameRules"
                                label="Last Name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row
                            align="center"
                            justify="center"
                            >
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <v-text-field
                                    v-model="password"
                                    label="Password"
                                    :rules="passwordRules"
                                    type="password"
                                ></v-text-field>
                            </v-col>
                        
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <v-text-field
                                    v-model="confirmPassword"
                                    label="Confirm Password"
                                    :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                                    type="password"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green"
                        text
                        x-large
                        @click="editUser"
                    >
                        Edit
                    </v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import bcrypt from 'bcryptjs'

    export default {
        name: 'EditProfileModal',

        props: {
            dialog: {
                type: Boolean,
                default: false
            },

            profile: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },

        data: () => ({
            valid: false,

            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            usernameRules: [
                v => !!v || 'Username is required'
            ],

            password: '',
            passwordRules: [
                v => !!v || 'Password is required'
            ],

            confirmPassword: '',
            confirmPasswordRules: [
                v => !!v || 'Confirm password is required'
            ]
        }),
        
        computed: {
            passwordConfirmationRule() {
                return () => this.password === this.confirmPassword || 'Passwords must match'
            }
        },

        methods: {
            ...mapActions(['editAccountAction']),

            validate () {
                this.$refs.form.validate()
            },

            async editUser() {
                let user = {
                    first: this.profile.first,
                    last: this.profile.last,
                    username: this.profile.username,
                    password: bcrypt.hashSync(this.password)
                }

                this.validate()

                if(this.valid) {
                    this.editAccountAction({ user })
                    this.$emit('close')
                }
            }
        }
    }
</script>

<style scoped>

</style>