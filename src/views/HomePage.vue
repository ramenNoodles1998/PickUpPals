<template>
    <div>
      <v-card
        class="mx-auto my-3 text-center" 
        color="#d3d3d3"
        height="810"
        width="1000"
      >
        <v-content>
          <v-card
            class="mx-auto my-3 text-center" 
            width="800"
          >
            <v-card-text>
              <p class="display-3 green--text">
                  <strong>Welcome to PickUpPals!</strong>
              </p>

              <div class="mx-2 display-1">
                We want you to find friends near you. <br>
                Get Started by logging in or creating account.
              </div>

              <Login 
                align="center"
                justify="center"
                no-title
              />
            </v-card-text>
          </v-card>
        </v-content>
      </v-card>
    </div>
</template>

<script>
  import Login from '../components/AuthenticationComponents/Login.vue'

  export default {
    name: 'HomePage',

    components: {
      Login
    }
  }
</script>

