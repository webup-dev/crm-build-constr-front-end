<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Create Role</strong>
          </div>
          <b-form
            @submit.prevent=checkForm
            novalidate=novalidate
          >
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <b-form-group
              description="Enter, please Name of Role"
              label="Name"
              label-for="roleName"
              :label-cols="3"
            >
              <b-form-input
                id="roleName"
                v-model="roleName"
                type="text"
                placeholder="Name">

              </b-form-input>
            </b-form-group>

            <b-form-group
              description="Enter, please Role description."
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
  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

    export default {
        name: 'RoleCreate',
        data() {
            return {
                roleName: '',
                description: '',
                errors: [],
                error: false
            }
        },
        methods: {
            checkForm: function (e) {
                // validation
                this.errors = [];

                if (!this.roleName) {
                    this.errors.push('Role is required.');
                }

                if (!this.errors.length) {
                    this.create();
                    return true;
                }

                e.preventDefault();
            },
            create() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };
                console.log(headers);
                let dataPost = {
                    name: this.roleName,
                    description: this.description
                };
                this.$http.post('/role', dataPost, headers)
                    .then(() => this.roleCreatingSuccessful())
                    .catch((request) => this.roleCreatingFailed(request));
            },

            roleCreatingSuccessful() {
                this.errors = false;
                this.error = false;
                this.flash('New Role created.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

                this.$router.replace(this.$route.query.redirect || '/roles/index')
            },

            roleCreatingFailed(req) {
                this.errors = false;
                this.error = 'Role Creating failed! ' + req;
                console.log(req);
            }
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
