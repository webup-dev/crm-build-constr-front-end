<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Method <b><span style="color: red">{{methodName}}</span></b>. Create Roles</strong>
          </div>
          <b-form
            @submit.prevent=checkForm
            novalidate=novalidate
          >
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="item in errors">{{ item }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
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
              <b-button
                type="submit"
                size="sm"
                variant="primary">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button type="reset" size="sm" variant="danger" v-bind:href="'#/methods/' + controllerId"><i
                class="fa fa-ban"></i> Reset
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
        name: 'MethodRolesCreate',
        components: {
            Multiselect
        },
        data() {
            return {
                multi: null,
                options: [],
                methodName: '',
                methodId: '',
                controllerId: '',
                errors: [],
                myError: false
            }
        },
        methods: {
            checkForm: function (e) {
                // validation
                this.errors = [];

                if (!this.multi) {
                    this.errors.push('Method Roles is required.');
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
                console.log('multi:');
                console.log(typeof this.multi);
                console.log(this.multi);

                let dataPost = {
                    method_id: this.$route.params.id,
                    role_ids: this.multi
                };

                console.log(dataPost);
                this.$http.post('/method-roles/' + this.$route.params.id, dataPost, headers)
                    .then(request => this.methodRolesCreatingSuccessful(request))
                    .catch((request) => this.methodRolesCreatingFailed(request));
            },

            methodRolesCreatingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('New Method Roles created.', 'success');

                this.$router.replace(this.$route.query.redirect || '/methods/' + this.controllerId)
            },

            methodRolesCreatingFailed(req) {
                this.errors = false;
                this.error = 'Method Roles Creating failed! ' + req;
                console.log(req);
            },
        },
        mounted() {
            let headers = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                }
            };
            this.$http.get(API_URL + '/methods/' + this.$route.params.id + '/show', headers)
                .then(response => {
                    this.methodName = response.data.data.name;
                    this.methodId = response.data.data.id;
                    this.controllerId = response.data.data.controller_id;
                });
            this.$http.get(API_URL + '/roles', headers)
                .then(response => (
                    this.options = response.data.data
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

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #FDD;
  }

  .error:focus {
    outline-color: #F99;
  }
</style>
