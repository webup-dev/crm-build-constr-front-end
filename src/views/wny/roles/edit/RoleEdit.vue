<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Edit Role</strong>
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
              label="Role ID"
              label-for="id"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="id"
                v-model.number="id"
                type="number">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Role Name"
              label-for="roleName"
              :label-cols="3"
            >
              <b-form-input
                id="roleName"
                v-model="roleName"
                type="text"
                autocomplete="roleName">
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Description"
              label-for="description"
              :label-cols="3"
            >
              <b-form-input
                id="description"
                v-model="description"
                type="text"
                autocomplete="description">
              </b-form-input>
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
                        href="#/roles/index">
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

    export default {
        name: 'RoleEdit',
        data() {
            return {
                id: this.$route.params.id,
                roleName: '',
                description: '',
                created_at: '',
                updated_at: '',
                error: false,
                errors: []
            }
        },
        methods: {
            checkForm: function (e) {
                // validation
                this.errors = [];

                if (!this.roleName) {
                    this.errors.push('Role name is required.');
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
                let dataPost = {
                    name: this.roleName,
                    description: this.description
                };
                this.$http.put('/roles/' + this.$route.params.id, dataPost, headers)
                    .then(request => this.roleUpdatingSuccessful(request))
                    .catch((request) => this.roleUpdatingFailed(request));
            },

            roleUpdatingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('The Role is updated.', 'success');

                this.$router.replace(this.$route.query.redirect || '/roles/' + this.$route.params.id)
            },

            roleUpdatingFailed(req) {
                this.errors = false;
                this.error = 'Role Updating failed! ' + req;
                console.log(req);
            }
        },
        mounted() {
            let headers = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                }
            };

            this.$http.get(API_URL + '/roles/' + this.$route.params.id, headers)
                .then(response => (
                    this.roleName = response.data.data.name,
                        this.description = response.data.data.description
                ))
        }
    }
</script>

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
