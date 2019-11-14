<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Edit User Role</strong>
          </div>
          <b-form
            @submit.prevent=checkForm
            novalidate=novalidate
          >
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <b-form-group
              label="User ID"
              label-for="user_id"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="user_id"
                v-model="user_id"
                type="text">

              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Name"
              label-for="user_name"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="user_name"
                v-model="user_name"
                type="text">

              </b-form-input>
            </b-form-group>

            <b-form-group
              description="Select, please Roles"
              label="Roles"
              label-for="role_ids"
              :label-cols="3"
            >
              <multiselect v-model="multi" :options="options" :multiple="true" label="name"
                           track-by="name"></multiselect>
            </b-form-group>

            <div slot="footer">
              <b-button type="submit"
                        size="sm"
                        variant="primary">
                <i class="fa fa-dot-circle-o"></i>
                Save
              </b-button>
              <b-button type="reset"
                        size="sm"
                        variant="danger"
                        href="#/user-roles/index">
                <i class="fa fa-ban"></i>
                Cancel
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    const API_URL = process.env.VUE_APP_API_URL;

    import Multiselect from 'vue-multiselect';

    export default {
        name: 'UserRoleCreate',
        components: {
            Multiselect
        },
        data() {
            return {
                user_id: this.$route.params.id,
                user_name: '',
                multi: [],
                options: [],
                errors: [],
                error: false
            }
        },
        methods: {
            checkForm: function (e) {
                // validation
                this.errors = [];

                if (!this.multi) {
                    this.errors.push('User Roles is required.');
                }

                if (!this.errors.length) {
                    this.update();
                    return true;
                }

                e.preventDefault();
            },
            update() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };
                console.log('multi:');
                console.log(typeof this.multi);
                console.log(this.multi);

                let dataPost = {
                    user_id: this.user_id,
                    role_ids: this.multi
                };
                console.log(dataPost);
                this.$http.put('/user-roles/' + this.$route.params.id, dataPost, headers)
                    .then(request => this.userRolesUpdatingSuccessful(request))
                    .catch((request) => this.userRolesUpdatingFailed(request));
            },

            userRolesUpdatingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('User Roles updated.', 'success');

                this.$router.replace(this.$route.query.redirect || '/user-roles/index')
            },

            userRolesUpdatingFailed(req) {
                this.errors = false;
                this.error = 'User Roles Updating failed! ' + req;
                console.log(req);
            },
        },
        mounted() {
            // get user_name
            this.$http.get(API_URL + '/profiles/' + this.$route.params.id)
                .then(response => (
                    this.user_name = response.data.data.name
                ));

            // get all roles
            this.$http.get(API_URL + '/roles')
                .then(response => (
                    this.options = response.data.data
                ));

            // get selected user-roles from DB
            this.$http.get(API_URL + '/user-roles/' + this.$route.params.id)
                .then(response => (
                    this.multi = response.data.data
                ));
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
