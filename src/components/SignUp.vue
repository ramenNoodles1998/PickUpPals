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
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-1">
            <v-btn class="mr-2" @click="newUser()">Submit</v-btn>

            <v-btn @click="switchPage()">Back to Login</v-btn>
        </v-row>
      </v-container>
    </v-form>
</template>

<script>
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

      newUser() {
          this.$router.push('/')
      }
    }
  }
</script>
