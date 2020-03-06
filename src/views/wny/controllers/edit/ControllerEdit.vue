<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Edit Controller</strong>
          </div>
          <b-form
            @submit.prevent=checkForm
            novalidate=novalidate
          >
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="item in errors" v-bind:key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="myError">
              {{ myError }}
            </div>
            <b-form-group
              description="Enter, please Name of the Controller"
              label="Name"
              label-for="name"
              :label-cols="3"
            >
              <b-form-input
                id="name"
                v-model="$v.name.$model"
                :class="status($v.name)"
                type="text"
                placeholder="ControllerName">

              </b-form-input>
            </b-form-group>

            <div slot="footer">
              <b-button type="submit"
                        size="sm"
                        variant="primary">
                <i class="fa fa-dot-circle-o"></i> Save
              </b-button>
              <b-button type="reset"
                        size="sm"
                        variant="danger"
                        href="#/controllers/index">
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

    import {required, alpha, minLength} from 'vuelidate/lib/validators'

    export default {
        name: 'RoleCreate',
        data() {
            return {
                name: '',
                errors: [],
                myError: false
            }
        },
        validations: {
            name: {
                required,
                alpha,
                minLength: minLength(5)
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
                    this.errors.push('Controller Name is required.');
                }

                if (!this.errors.length && !this.$v.name.$error) {
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
                    name: this.name
                };
                this.$http.put('/controllers/' + this.$route.params.id, dataPost, headers)
                    .then(() => this.controllerCreatingSuccessful())
                    .catch((request) => this.controllerCreatingFailed(request));
            },

            controllerCreatingSuccessful() {
                this.errors = false;
                this.error = false;
                this.flash('New Controller is created.', 'success');

                this.$router.replace(this.$route.query.redirect || '/controllers/index')
            },

            controllerCreatingFailed(req) {
                this.errors = false;
                this.myError = 'Controller Creating failed! ' + req;
                console.log(req);
            }
        },
        mounted() {
            this.$http.get(API_URL + '/controllers/' + this.$route.params.id)
                .then(response => (
                    this.name = response.data.data.name
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
