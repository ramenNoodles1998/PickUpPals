<template>
  <div>
    <v-form 
      ref="form"
      v-model="valid"
    >
      <v-container>
        <div class="display-1 green--text">Sign Up</div>
        
        <v-row
          :align="align"
          :justify="justify"
        >
          <v-col
            cols="12"
            md="8"
          >
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
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
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="First Name"
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
            <v-text-field
              v-model="password"
              label="Password"
              :rules="passwordRules"
              type="password"
            ></v-text-field>
          </v-col>
            
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
              type="password"
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
                @click="signUpUser()"
              >
                Sign Up
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-btn 
                text
                @click="switchPage()"
              >
                Login
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
    name: 'SignUp',

    props: {
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

      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      username: '',
      usernameRules: [
        v => !!v || 'Username is required'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      confirmPassword: '',
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required'
      ]
    }),

    computed: {
      passwordConfirmationRule() {
        return () =>
          this.password === this.confirmPassword || 'Passwords must match'
      }
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },

      switchPage() {
        this.$router.push('/LoginPage')
      },

      async signUpUser() {
        this.loading = true
        let user = {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password
        }

        this.validate()

        if(this.valid) {
          try {
            await auth.registerUser(user)
            await auth.login(user)
            this.loading = false
            this.$router.push('/feedPage')
          } catch {
            this.loading = false
          }
        }
      }
    }
  }
</script>
