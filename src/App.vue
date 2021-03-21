<template>
  <v-app>
    <v-main>
      <v-toolbar>
        <v-toolbar-title>
          PickUpPals
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
            text
          >
           <router-link class="ma-3" to="/">Home</router-link>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items v-if="!$store.state.isLoggedIn">
          <v-btn
            text
          >
            <router-link class="ma-3 router-link" to="/loginPage">Login</router-link>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else>
          <v-btn
            text
          >
            <router-link class="ma-3" to="/account">{{ username }}</router-link>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState(['username'])
  },

  beforeCreate() {
    this.$store.dispatch('authenticate')
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: red;
  }
</style>
