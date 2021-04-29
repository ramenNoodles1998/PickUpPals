<template>
  <v-app>
    <v-main>
      <NavBar/>

      <router-view></router-view>

      <Footer />
    </v-main>
  </v-app>
</template>

<script>
  import NavBar from './components/BaseComponents/NavBar.vue'
  import Footer from './components/BaseComponents/Footer.vue'

  export default {
    name: 'App',

    components: {
      NavBar,
      Footer
    }
  }
</script>

