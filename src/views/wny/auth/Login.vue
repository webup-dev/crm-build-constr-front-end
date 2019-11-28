<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <div class="alert alert-danger" v-if="error">{{ error }}</div>
                  <flash-message></flash-message>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model="email" id="inputEmail" type="email" class="form-control" placeholder="Email"
                                  autocomplete="username email"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model="password" id="inputPassword" type="password" class="form-control"
                                  placeholder="Password" autocomplete="current-password"/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
    import store from "../../../store";
    import mixin from "../../../mixins/mixin";
    import axios from "../../../backend/vue-axios/axios";

    const API_URL = process.env.VUE_APP_API_URL;

    export default {
        name: 'Login',
        mixins: [mixin],
        data() {
            return {
                email: '',
                password: '',
                error: false
            }
        },
        methods: {
            login() {
                this.$http.post('/auth/login', {email: this.email, password: this.password})
                    .then(request => this.loginSuccessful(request))
                    .catch(() => this.loginFailed());
            },

            loginSuccessful(req) {
                if (!req.data.token) {
                    this.loginFailedFromLoginSuccessful(req);
                    return
                }

                localStorage.token = req.data.token;
                this.error = false;

                this.mainRole();
                this.me();

                this.$router.replace(this.$route.query.redirect || '/dashboard')
            },

            loginFailedFromLoginSuccessful(req) {
                this.error = 'Login was successful but failed!';
                delete localStorage.token;
            },

            loginFailed(req) {
                this.error = 'Login failed!';
                delete localStorage.token;
            },

            me() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };
                this.$http.get('/auth/me', headers)
                    .then(request => this.meSuccessful(request))
                    .catch(() => this.meFailed());
            },

            meSuccessful(req) {
                console.log("req");
                console.log(req);
                const name = req.data.name;
                const id = req.data.id;

                this.userStoreConfig(name, id);

                this.error = false;

                this.redirecting();
            },

            redirecting() {
                let role = store.state.user.role;

                switch (role) {
                    case 'developer':
                        this.$router.replace(this.$route.query.redirect || '/dashboard-developer');
                        break;
                    case 'platform-superadmin':
                        this.$router.replace(this.$route.query.redirect || '/dashboard-platform-superadmin');
                        break;
                    case 'platform-admin':
                        this.$router.replace(this.$route.query.redirect || '/dashboard-platform-admin');
                        break;
                    case 'organization-superadmin':
                        this.$router.replace(this.$route.query.redirect || '/dashboard-organization-superadmin');
                        break;
                    default:
                        this.$router.replace(this.$route.query.redirect || '/dashboard');
                        break;
                }
            },

            meFailed(req) {
                this.error = 'Main role getting is failed!';
                delete localStorage.token;
            }
        }
    }
</script>
