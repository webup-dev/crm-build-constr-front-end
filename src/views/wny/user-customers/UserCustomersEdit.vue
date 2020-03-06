<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Change the customer of the pair user-customer</strong><small style="color: red"
                                                                                                    class="ml-1">
            Asterisk * means required
            parameter</small>
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
            <input type="hidden" name="userId" :value="userId">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Customer *"
                              label-for="customer_id"
                              :label-cols="3"
                              style="font-weight: bold">
                  <b-form-select id="customer_id"
                                 v-model="$v.customerId.$model"
                                 :plain="true"
                                 :options=options
                                 :class="status($v.customerId)">
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group label="User Account Email"
                              :label-cols="3"
                              style="font-weight: bold">
                  <b-input-group>
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class='fa fa-envelope-o'></i></span>
                    </div>
                    <b-form-input id="email"
                                  plaintext
                                  type="text"
                                  name="email"
                                  class="form-control"
                                  v-model="$v.email.$model">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>

            <div slot="footer" style="margin-top: 20px;">
              <b-button type="submit"
                        size="sm"
                        variant="primary">
                <i class="fa fa-dot-circle-o"></i> Save
              </b-button>
              <b-button type="reset"
                        size="sm"
                        variant="danger"
                        href="#/admin/user-customers">
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

  import {validations} from './validationEdit'
  import mixin from "../../../mixins/mixin";

  export default {
    name: 'UserCustomerEdit',
    mixins: [mixin],
    components: {
    },
    data() {
      return {
        customers: [], // item list for select
        errors: [],
        error: false,
        email: '',
        customerId: '',
        userId: ''
      }
    },
    validations: validations,
    computed: {
      options: function () {
        let trick = this.customers;
        let optionsArr = [];

        trick.forEach(function (item) {
          let row = {
            value: item.id,
            text: item.name
          };

          optionsArr.push(row)
        });

        return optionsArr;
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

        // customer
        if (!this.$v.customerId.required) {
          this.errors.push('Customer is required.');
        }

        // user
        if (!this.$v.email.required) {
          this.errors.push('Email is required.');
        }

        if (!this.errors.length) {
          this.save();
          return true;
        } else {
          this.$v.$touch();
          this.submitStatus = "Error";
        }

        e.preventDefault();
      },
      save() {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        let dataPost = {
          customer_id: this.customerId,
          user_id: this.userId
        };

        this.$http.put('/user-customers/' + this.$route.params.id, dataPost, headers)
            .then(() => this.userCustomersUpdateSuccessful())
            .catch((request) => this.userCustomersUpdateFailed(request));
      },
      userCustomersUpdateSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('User-Customer updated.', 'success');

        this.$router.replace(this.$route.query.redirect || '/admin/user-customers')
      },
      userCustomersUpdateFailed(req) {
        this.errors = false;
        this.error = 'User-Customer updated failed! ' + req;
      }
    },
    created() {
      // get source data to process it and insert it in the select
      let headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      };
      this.$http.get(API_URL + '/customers', headers)
          .then(response => {
            this.customers = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
            // console.log(this.message);
            // console.log(this.success);
            // console.log("data: " + this.data[0]['name']);
            // console.log("start_date: " + this.data[1]['start_date']);
          })
          .catch(error => console.log(error));

      this.$http.get(API_URL + '/user-customers/' + this.$route.params.id , headers)
          .then(response => {
            this.email = response.data.data.user.email;
            this.userId = response.data.data.user.id;
            this.customerId = response.data.data.customer_id;
            this.message = response.data.message;
            this.success = response.data.success;
            // console.log(this.message);
            // console.log(this.success);
            // console.log("data: " + this.data[0]['name']);
            // console.log("start_date: " + this.data[1]['start_date']);
          })
          .catch(error => console.log(error));

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

  section.border {
    border: 2px solid #b6e4f4;
    padding: 10px;
  }
</style>
