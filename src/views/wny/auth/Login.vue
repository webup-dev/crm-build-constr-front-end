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

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
                error: false
            }
        },
        methods: {
            login() {
                console.log("Login. Before start.");
                // console.log("store.state.role.isSuperadmin: " + store.state.role.isSuperadmin);
                // console.log("store.state.role.isAdmin: " + store.state.role.isAdmin);
                this.$http.post('/auth/login', {email: this.email, password: this.password})
                    .then(request => this.loginSuccessful(request))
                    .catch(() => this.loginFailed());
                // console.log(this.email);
                // console.log(this.password)
            },

            loginSuccessful(req) {
                console.log("Login. Success.");
                if (!req.data.token) {
                    console.log("Login. Success. Token is absent. Token: " + req.data.token);
                    this.loginFailedFromLoginSuccessful(req);
                    return
                }

                localStorage.token = req.data.token;
                console.log("Login. Success. Token in the Storage: " + localStorage.token);
                this.error = false;

                this.mainRole();
                this.me();

                this.$router.replace(this.$route.query.redirect || '/dashboard')
            },

            loginFailedFromLoginSuccessful(req) {
                this.error = 'Login was successful but failed!';
                console.log(req);
                delete localStorage.token;
                console.log("FailedFromLoginSuccessful. Token was deleted. Token: " + localStorage.token);
            },

            loginFailed(req) {
                this.error = 'Login failed!';
                console.log(req);
                delete localStorage.token;
                console.log("loginFailed. Token was deleted. Token: " + localStorage.token);
            },

            mainRole() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };
                this.$http.get('/rules/main-role', headers)
                    .then(request => this.mainRoleSuccessful(request))
                    .catch(() => this.mainRoleFailed());

                return;
            },

            mainRoleSuccessful(req) {
                const mainRole = req.data.data.name;
                console.log("MainRole. Success. MainRole: " + mainRole);
                console.log(req);
                if (Array.isArray(mainRole) && !mainRole.length) {
                    console.log("Main Role. Success. Data is not empty array.");
                    this.mainRoleSuccessfulFailed(req);
                    return
                }

                this.roleStoreConfig(mainRole);
                this.userRoleStoreConfig(mainRole);

                console.log("MainRole. Success. isSuperadmin: " + store.state.role.isSuperadmin);
                console.log("MainRole. Success. isAdmin: " + store.state.role.isAdmin);
                console.log("MainRole. Success. user.role: " + store.state.user.role);
                this.error = false;
            },

            mainRoleFailed(req) {
                this.error = 'Main role getting is failed!';
                console.log("Main role getting is failed. Request: " + req);
                delete localStorage.token;
                console.log("loginFailed. Token was deleted. Token: " + localStorage.token);
                console.log("Main role getting is failed. Role: " + localStorage.token);
            },

            mainRoleSuccessfulFailed(req) {
                this.flash('You do not have any role.', 'error');
                this.roleStoreConfig('guest');
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

                return;
            },

            meSuccessful(req) {
                const name = req.data.name;

                this.userStoreConfig(name);

                console.log("Me: " + store.state.user.name);
                this.error = false;

                this.$router.replace(this.$route.query.redirect || '/dashboard')
            },

            meFailed(req) {
                this.error = 'Main role getting is failed!';
                console.log("Main role getting is failed. Request: " + req);
                delete localStorage.token;
                console.log("loginFailed. Token was deleted. Token: " + localStorage.token);
                console.log("Main role getting is failed. Token: " + localStorage.token);
            }
        }
    }
</script>
