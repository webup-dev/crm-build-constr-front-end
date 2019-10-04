<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Controller <b><span style="color: red">{{controllerName}}</span></b>. Create Method</strong>
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
              description="Enter, please Name of the Method"
              label="Name"
              label-for="name"
              :label-cols="3"
            >
              <b-form-input
                id="name"
                v-model="$v.name.$model"
                :class="status($v.name)"
                type="text"
                placeholder="MethodName">

              </b-form-input>
            </b-form-group>

            <div slot="footer">
              <b-button
                type="submit"
                size="sm"
                variant="primary">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button type="reset" size="sm" variant="danger" v-bind:href="'#/methods/' + controllerId"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    const API_URL = process.env.VUE_APP_API_URL;

    import { required, alpha, minLength } from 'vuelidate/lib/validators'

    export default {
        name: 'RoleCreate',
        data() {
            return {
                name: '',
                controllerName: '',
                controllerId: '',
                errors: [],
                myError: false
            }
        },
        validations: {
          name: {
              required,
              alpha,
              minLength: minLength(3)
          }
        },
        methods: {
            status(validation) {
                return {
                    error: validation.$error,
                    dirty: validation.$dirty
                }
            },
            checkForm: function (e) {
                // validation
                this.errors = [];

                if (!this.name) {
                    this.errors.push('Method Name is required.');
                }

                // if (!this.errors.length) {
                //     this.create();
                //     return true;
                // }
                if (!this.errors.length && !this.$v.name.$error) {
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
                    name: this.name,
                    controller_id: this.controllerId
                };
                this.$http.post('/methods/' + this.$route.params.id, dataPost, headers)
                    .then(request => this.methodCreatingSuccessful(request))
                    .catch((request) => this.methodCreatingFailed(request));
            },

            methodCreatingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('New Method is created.', 'success');

                this.$router.replace(this.$route.query.redirect || '/methods/' + this.$route.params.id)
            },

            methodCreatingFailed(req) {
                this.errors = false;
                this.myError = 'Method Creating failed! ' + req;
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
            this.$http.get(API_URL + '/controllers/' + this.$route.params.id, headers)
                .then(response => {
                    this.controllerName = response.data.data.name;
                    this.controllerId = response.data.data.id;
                })
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
