<template>
  <v-app>
    <v-main>
      <v-toolbar>
        <v-toolbar-title>PickUpPals</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <router-link class="ma-3" to="/">Home</router-link>
        </v-toolbar-items>

        <v-toolbar-items>
          <router-link class="ma-3" to="/loginPage">Login</router-link>
        </v-toolbar-items>
      </v-toolbar>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

};
</script>
