<template>
  <v-form v-model="valid">
      <v-container>
        <div class="display-1">Login</div>

        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="username"
              label="Username"
              required
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
           <v-col
              cols="12"
              md="4"
            >
              <v-btn class="mr-2" @click="login">Login</v-btn>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-btn @click="switchPage()">Go To Create Account</v-btn>
            </v-col>
        </v-row>
      </v-container>
      
    </v-form>
</template>

<script>
  import * as auth from '../services/AuthService.js'

  export default {
    name: 'Login',

    data: () => ({
        username: '',
        password: '',
        valid: true
      }),

    methods: {
      switchPage() {
        this.$emit('switchPage')
      },

      async login() {
        let user = {
          username: this.username,
          password: this.password
        }

        let response = await auth.login(user)
        console.log(response)
        this.$router.replace('/')
      }
    }
  }
</script>
