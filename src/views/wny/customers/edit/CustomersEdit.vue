<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Edit Customer</strong>
          </div>
          <b-form @submit.prevent=checkForm
                  novalidate=novalidate>
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="item in errors" v-bind:key="item">{{ item }}</li>
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
                            type="text">
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
                          label-for="department_id"
                          :label-cols="4"
                          class="label-bold">
              <b-form-select id="department_id"
                             v-model="$v.departmentId.$model"
                             :plain="true"
                             :options=parents
                             :class="status($v.departmentId)"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group label="Mailing Address Line 1 *"
                          label-for="line_1"
                          :label-cols="4"
                          class="label-bold">
              <b-form-input id="line_1"
                            v-model="$v.line_1.$model"
                            :class="status($v.line_1)"
                            type="text">
              </b-form-input>
            </b-form-group>

            <b-form-group label="Mailing Address Line 2"
                          label-for="line_2"
                          :label-cols="4"
                          class="label-bold">
              <b-form-input id="line_2"
                            v-model="$v.line_2.$model"
                            :class="status($v.line_2)"
                            type="text">
              </b-form-input>
            </b-form-group>

            <b-form-group label="City *"
                          label-for="city"
                          :label-cols="4"
                          class="label-bold">
              <b-form-input id="city"
                            v-model="$v.city.$model"
                            :class="status($v.city)"
                            type="text">

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
                        v-bind:href="'#/admin/customers'"><i
                class="fa fa-ban"></i> Cancel
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

  import orgDeps from "../../../../mixins/orderedDepartments";
  import {validations} from '../validationEdit'
  import {states} from './../../../../shared/states';
  import axios from "../../../../backend/vue-axios/axios";

  export default {
    name: 'CustomersEdit',
    mixins: [orgDeps],
    data() {
      return {
        name: '',
        customerType: '',
        customerTypes: ['Individual(s)', 'Business'],
        departmentId: 'Please select an option',
        city: '',
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

        if (!this.$v.name.alphaSpaceHyphenAnd) {
          this.errors.push('Customer Account Name accepts alphabet, space, hyphen, & only.');
        }

        // customerType
        if (!this.$v.customerType.required) {
          this.errors.push('Customer Type is required.');
        }

        // departmentId
        if (!this.$v.departmentId.numeric) {
          this.errors.push('Organization is required.');
        }
        // city
        if (!this.$v.city.required) {
          this.errors.push('City is required.');
        }

        if (!this.$v.city.city) {
          this.errors.push('City accepts alphabet, space, hyphen only.');
        }

        // line_1
        if (!this.$v.line_1.required) {
          this.errors.push('Line 1 is required.');
        }

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
          name: this.name,
          organization_id: this.departmentId,
          type: this.customerType,
          city: this.city,
          line_1: this.line_1,
          line_2: this.line_2,
          state: this.state,
          zip: this.zip
        };

        axios.put('/customers/' + this.$route.params.id, dataPost, headers)
             .then(() => this.organizationsUpdatingSuccessful())
             .catch((request) => this.organizationsUpdatingFailed(request));
      },

      organizationsUpdatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('Customer is updated.', 'success');

        this.$router.replace(this.$route.query.redirect || '/admin/customers')
      },

      organizationsUpdatingFailed(req) {
        this.errors = false;
        this.error = 'Customer Updating is failed! ' + req;
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
    },
    mounted() {
      let headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      };
      this.$http.get(API_URL + '/customers/' + this.$route.params.id, headers)
          .then(response => (
            this.name = response.data.data.name,
              this.customerType = response.data.data.type,
              this.departmentId = response.data.data.organization_id,
              this.city = response.data.data.city,
              this.line_1 = response.data.data.line_1,
              this.line_2 = response.data.data.line_2,
              this.state = response.data.data.state,
              this.zip = response.data.data.zip
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
