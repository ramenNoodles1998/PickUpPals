<template>
  <div>
    <v-form 
      ref="form"
      v-model="valid"
    >
        <v-container>
          <div 
            v-if="!noTitle"
            class="display-1 green--text"
          >
            Login
          </div>

          <v-row
            :align="align"
            :justify="justify"
          >
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="username"
                label="Username"
                :rules="usernameRules"
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
                :rules="passwordRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            :align="align"
            :justify="justify"
          >
            <v-col
                cols="12"
                md="4"
              >
                <v-btn 
                  class="mr-2" 
                  color="green"
                  text
                  :loading="loading"
                  @click="login"
                >
                  Login
                </v-btn>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-btn 
                  @click="switchPage()"
                  text
                >
                  Create Account
                </v-btn>
              </v-col>
          </v-row>
        </v-container>
      </v-form>
  </div>
</template>

<script>
  import * as auth from '../../services/AuthService.js'

  export default {
    name: 'Login',

    props: {
      noTitle: {
        type: Boolean,
        default: false
      },

      align: {
        type: String,
        default: 'left'
      },

      justify: {
        type: String,
        default: 'left'
      }
    },

    data: () => ({
        valid: false,
        loading: false,

        username: '',
        usernameRules: [
          v => !!v || 'Username is required'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required'
        ]
      }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      
      switchPage() {
         this.$router.push('/SignupPage')
      },

      async login() {
        this.loading = true
        let user = {
          username: this.username,
          password: this.password
        }
        
        this.validate()

        if(this.valid) {
          try {
            await auth.login(user)
            this.$router.push('/feedPage')
            this.loading = false
          } catch {
            this.loading = false
          }
        }
      }
    }
  }
</script>
