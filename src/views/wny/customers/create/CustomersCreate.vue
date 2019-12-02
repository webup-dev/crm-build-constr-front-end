<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Create Customer</strong>
          </div>
          <b-form @submit.prevent=checkForm
                  novalidate=novalidate>
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="item in errors">{{ item }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <b-form-group label="Customer Account Name *"
                          label-for="name"
                          :label-cols="4"
                          class="label-bold">
              <b-form-input id="name"
                            v-model="$v.name.$model"
                            :class="status($v.name)"
                            type="text"
                            placeholder="Enter, please Customer Name">

              </b-form-input>
            </b-form-group>

            <b-form-group label="Customer Type *"
                          label-for="customerType"
                          :label-cols="4"
                          class="label-bold">
              <b-form-select id="customerType"
                             v-model="$v.customerType.$model"
                             :plain="true"
                             :options=customerTypes
                             :class="status($v.customerType)"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group label="Organization *"
                          label-for="departmentId"
                          :label-cols="4"
                          class="label-bold">
              <b-form-select id="departmentId"
                             v-model="$v.departmentId.$model"
                             :plain="true"
                             :options=parents
                             :class="status($v.departmentId)"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group label="Mailing Address Line 1"
                          label-for="line_1"
                          :label-cols="4"
                          class="label-bold">
              <b-form-input id="line_1"
                            v-model="$v.line_1.$model"
                            :class="status($v.line_1)"
                            type="text"
                            placeholder="Mailing Address Line 1">

              </b-form-input>
            </b-form-group>

            <b-form-group label="Mailing Address Line 2"
                          label-for="line_2"
                          :label-cols="4"
                          class="label-bold">
              <b-form-input id="line_2"
                            v-model="$v.line_2.$model"
                            :class="status($v.line_2)"
                            type="text"
                            placeholder="Mailing Address Line 2">
              </b-form-input>
            </b-form-group>

            <b-form-group label="State"
                          label-for="state"
                          :label-cols="4"
                          class="label-bold">
              <b-form-select id="state"
                             v-model="$v.state.$model"
                             :plain="true"
                             :options=states
                             :class="status($v.state)">
              </b-form-select>
            </b-form-group>

            <b-form-group label="Postal Code"
                          label-for="zip"
                          :label-cols="4"
                          class="label-bold">
              <b-form-input id="zip"
                            v-model="$v.zip.$model"
                            type="text"
                            :class="status($v.zip)">
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
                        v-bind:href="'#/admin/customers'"><i class="fa fa-ban"></i> Cancel
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

  import store from "../../../../store";
  import orgDeps from "../../../../mixins/orderedDepartments";
  import {validations} from '../validation'
  import {states} from './../../../../shared/states';
  import axios from "../../../../backend/vue-axios/axios";

  export default {
    name: 'CustomersCreate',
    mixins: [orgDeps],
    data() {
      return {
        name: '',
        customerType: '',
        customerTypes: ['Individual(s)', 'Business'],
        departmentId: 'Please select an option',
        line_1: '',
        line_2: '',
        state: '',
        zip: '',
        optionsApi: [],
        states: states,
        errors: [],
        error: false
      }
    },
    validations: validations,
    methods: {
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      // checkForm: function (e) {
      //     this.$v.$touch();
      //     if (this.$v.$invalid) {
      //         this.submitStatus = "Error";
      //         this.errors.push('Field requirements not satisfied. See, please red fields.')
      //     } else {
      //         this.create();
      //         this.submitStatus = "Creating";
      //         return true
      //     }
      //
      //     e.preventDefault();
      // },
      checkForm: function (e) {
        // validation
        this.errors = [];

        // name
        if (!this.$v.name.required) {
          this.errors.push('Customer Account Name is required.');
        }

        if (!this.$v.name.minLength) {
          this.errors.push('Customer Account Name must have at least ' + this.$v.name.$params.minLength.min + ' letters.');
        }

        if (!this.$v.name.alphaSpaceHyphen) {
          this.errors.push('Customer Account Name accepts alphabet, space, hyphen only.');
        }

        // customerType
        if (!this.$v.customerType.required) {
          this.errors.push('Customer Type is required.');
        }

        // departmentId
        if (!this.$v.departmentId.numeric) {
          this.errors.push('Organization is required.');
        }

        // line_1
        if (!this.$v.line_1.address) {
          this.errors.push('Mailing Address Line 1 accepts alphabet, digits, space, hyphen, dot, comma, # only.');
        }

        // line_2
        if (!this.$v.line_2.address) {
          this.errors.push('Mailing Address Line 2 accepts alphabet, digits, space, hyphen, dot, comma, # only.');
        }

        // zip
        if (this.zip) {
          if (!this.$v.zip.numeric) {
            this.errors.push('Postal Code accepts digits only.');
          }

          if (!this.$v.zip.maxLength) {
            this.errors.push('Postal Code must have not more than ' + this.$v.zip.$params.maxLength.max + ' digits.');
          }
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

        let dataPost = {
          name: this.name,
          organization_id: this.departmentId,
          type: this.customerType,
          line_1: this.line_1,
          line_2: this.line_2,
          state: this.state,
          zip: this.zip
        };

        console.log(dataPost);
        axios.post('/customers', dataPost, headers)
             .then(request => this.organizationsCreatingSuccessful(request))
             .catch((request) => this.organizationsCreatingFailed(request));
      },

      organizationsCreatingSuccessful(req) {
        this.errors = false;
        this.error = false;
        this.flash('New Customer is created.', 'success');

        this.$router.replace(this.$route.query.redirect || '/admin/customers')
      },

      organizationsCreatingFailed(req) {
        this.errors = false;
        this.error = 'Customer Creating failed! ' + req;
        console.log(req);
      }
    },
    created() {
      let headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      };
      axios.get(API_URL + '/organizations', headers)
           .then(response => (
             this.optionsApi = this.getParents(response.data.data)
           ));
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

  .label-bold {
    font-weight: bold
  }
</style>
