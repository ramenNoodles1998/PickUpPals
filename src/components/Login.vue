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
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-1">
          <v-btn class="mr-2">Login</v-btn>
          
          <v-btn @click="switchPage()">Sign Up</v-btn>
        </v-row>
      </v-container>
      
    </v-form>
</template>

<script>
  export default {
    name: 'Login',

    data: () => ({
        username: '',
        password: ''
      }),

    methods: {
      switchPage() {
        this.$emit('switchPage')
      }
    }
  }
</script>
