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
                <li v-for="item in errors">{{ item }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <b-form-group description="Accepts alphabet, space, hyphen only"
                          label="Customer Name"
                          label-for="name"
                          :label-cols="3"
                          class="label-bold">
              <b-form-input id="name"
                            v-model="$v.name.$model"
                            :class="status($v.name)"
                            type="text">
              </b-form-input>
            </b-form-group>

            <b-form-group description="Select type, please"
                          label="Customer Type *"
                          label-for="customerType"
                          :label-cols="3"
                          class="label-bold">
              <b-form-select id="customerType"
                             v-model="$v.customerType.$model"
                             :plain="true"
                             :options=customerTypes
                             :class="status($v.customerType)"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group description="Select organization, please"
                          label="Organization *"
                          label-for="department_id"
                          :label-cols="3"
                          class="label-bold">
              <b-form-select id="department_id"
                             v-model="$v.departmentId.$model"
                             :plain="true"
                             :options=parents
                             :class="status($v.departmentId)"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group description="Accepts alphabet, digits, space, hyphen, dot, comma, # only"
                          label="Mailing Address Line 1"
                          label-for="line_1"
                          :label-cols="3"
                          class="label-bold">
              <b-form-input id="line_1"
                            v-model="$v.line_1.$model"
                            :class="status($v.line_1)"
                            type="text"
                            placeholder="Mailing Address Line 1">
              </b-form-input>
            </b-form-group>

            <b-form-group description="Accepts alphabet, digits, space, hyphen, dot, comma, # only"
                          label="Mailing Address Line 2"
                          label-for="line_2"
                          :label-cols="3"
                          class="label-bold">
              <b-form-input id="line_2"
                            v-model="$v.line_2.$model"
                            :class="status($v.line_2)"
                            type="text"
                            placeholder="Mailing Address Line 2">
              </b-form-input>
            </b-form-group>

            <b-form-group description="Accepts alphabet, space, hyphen only"
                          label="Mailing City"
                          label-for="city"
                          :label-cols="3"
                          class="label-bold">
              <b-form-input id="city"
                            v-model="$v.city.$model"
                            :class="status($v.city)"
                            type="text"
                            placeholder="Mailing City">
              </b-form-input>
            </b-form-group>

            <b-form-group description="Select, please state"
                          label="State *"
                          label-for="state"
                          :label-cols="3"
                          class="label-bold">
              <b-form-select id="state"
                             v-model="$v.state.$model"
                             :plain="true"
                             :options=states
                             :class="status($v.state)">
              </b-form-select>
            </b-form-group>

            <b-form-group description="Accepts digits"
                          label="Postal Code *"
                          label-for="zip"
                          :label-cols="3"
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

    import store from "../../../../store";
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
                customerTypes: ['individual', 'organization'],
                departmentId: 'Please select an option',
                line_1: '',
                line_2: '',
                city: '',
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
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = "Error";
                    this.errors.push('Field requirements not satisfied. See, please red fields.')
                } else {
                    this.update();
                    this.submitStatus = "Creating";
                    console.log("submitStatus: " + this.submitStatus)
                    return true
                }

                console.log("submitStatus: " + this.submitStatus)
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
                    line_1: this.line_1,
                    line_2: this.line_2,
                    city: this.city,
                    state: this.state,
                    zip: this.zip
                };

                axios.put('/customers/' + this.$route.params.id, dataPost, headers)
                     .then(request => this.organizationsUpdatingSuccessful(request))
                     .catch((request) => this.organizationsUpdatingFailed(request));
            },

            organizationsUpdatingSuccessful(req) {
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
                        this.line_1 = response.data.data.line_1,
                        this.line_2 = response.data.data.line_2,
                        this.city = response.data.data.city,
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
