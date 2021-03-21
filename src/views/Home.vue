<template>
  <div class="home mt-10">
    Home Page
    <v-btn @click="logout">logout</v-btn>
  </div>
</template>

<script>
  import * as auth from '../services/AuthService.js'

  export default {
    name: 'Home',
    methods: {
      logout() {
        auth.logout()
        this.$router.push('/')

      }
    }
  }
</script>

<style scoped>

</style>
