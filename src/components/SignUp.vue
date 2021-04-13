<template>
  <v-form v-model="valid">
      <v-container>
        <div class="display-1">Sign Up</div>

        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="First Name"
              required
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Last Name"
              required
            ></v-text-field>
          </v-col>
        </v-row>

                <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="Username"
              required
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="password"
              label="Password"
              required
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
              required
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-btn class="mr-2" @click="signUpUser()">Sign Up</v-btn>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-btn @click="switchPage()">Back to Login</v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
</template>

<script>
  import * as auth from '../services/AuthService.js'

  export default {
    name: 'SignUp',

    data: () => ({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: ''
    }),

    methods: {
      switchPage() {
        this.$emit('switchPage')
      },

      async signUpUser() {
        let user = {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password
        }
        const registerPromise = auth.registerUser(user)
        const loginPromise = auth.login(user)
        await Promise.all([registerPromise, loginPromise])

        this.$router.replace('/feedPage')
      }
    }
  }
</script>
