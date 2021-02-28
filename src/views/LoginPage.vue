<template>
  <div class="login-page">
    <div v-if="loginOpen">
      <Login 
        @switchPage="switchPage"
      />
    </div>
    <div v-else>
      <SignUp 
        @switchPage="switchPage"
      />
    </div>
  </div>
</template>

<script>
  import Login from '@/components/Login.vue'
  import SignUp from '@/components/SignUp.vue'

  export default {
    name: 'LoginPage',

    components: {
      Login,
      SignUp
    },

    data: () => ({ 
      loginOpen: true
    }),

    methods: {
      switchPage() {
        if(this.loginOpen) {
          this.loginOpen = false
        } else {
          this.loginOpen = true
        }
      }
    }
  }
</script>