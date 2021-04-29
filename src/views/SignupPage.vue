<template>
  <div class="signup-page">
    <v-card
        class="mx-auto my-3 text-center" 
        color="#d3d3d3"
        height="810"
        width="1000"
      >
        <v-content>
          <v-card
            class="mx-auto my-3 text-center" 
            height="775"
            width="800"
          >
            <v-card-text>
              <Signup 
                align="center"
                justify="center"
              />
            </v-card-text>
          </v-card>
        </v-content>
      </v-card>
    </div>
</template>

<script>
  import Signup from '../components/AuthenticationComponents/Signup.vue'

  export default {
    name: 'SignupPage',

    components: {
      Signup
    }
  }
</script>