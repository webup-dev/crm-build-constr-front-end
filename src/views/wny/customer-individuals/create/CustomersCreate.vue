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
                <li v-for="item in errors" v-bind:key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <b-form-group description="Accepts alphabet, space, hyphen only"
                          label="Customer First Name *"
                          label-for="firstName"
                          :label-cols="3">
              <b-form-input id="firstName"
                            v-model="$v.firstName.$model"
                            :class="status($v.firstName)"
                            type="text"
                            placeholder="Enter, please Customer First Name">

              </b-form-input>
            </b-form-group>

            <b-form-group description="Accepts alphabet, space, hyphen only"
                          label="Customer Last Name *"
                          label-for="lastName"
                          :label-cols="3">
              <b-form-input id="lastName"
                            v-model="$v.lastName.$model"
                            :class="status($v.lastName)"
                            type="text"
                            placeholder="Enter, please Customer Last Name">

              </b-form-input>
            </b-form-group>

            <b-form-group description="Select type, please"
                          label="Customer Type *"
                          label-for="customerType"
                          :label-cols="3">
              <b-form-select id="customerType"
                             v-model="$v.customerType.$model"
                             :plain="true"
                             :options=customerTypes
                             :class="status($v.customerType)"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group label="Note"
                          label-for="note"
                          :label-cols="3">
              <b-form-input id="note"
                            v-model="$v.note.$model"
                            :class="status($v.note)"
                            type="text"
                            placeholder="Note">

              </b-form-input>
            </b-form-group>


            <b-form-group description="Select organization, please"
                          label="Organization *"
                          label-for="department_id"
                          :label-cols="3">
              <b-form-select id="department_id"
                             v-model="$v.departmentId.$model"
                             :plain="true"
                             :options=parents
                             :class="status($v.departmentId)"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group description="Enter email, please"
                          label="Email *"
                          label-for="email"
                          :label-cols="3">
              <b-form-input id="note"
                            v-model="$v.email.$model"
                            :class="status($v.email)"
                            type="text"
                            placeholder="Email">

              </b-form-input>
            </b-form-group>

            <b-form-group description="Enter password, please"
                          label="Password *"
                          label-for="password"
                          :label-cols="3">
              <b-form-input id="note"
                            v-model="$v.password.$model"
                            :class="status($v.password)"
                            type="text"
                            placeholder="Password">

              </b-form-input>
            </b-form-group>

            <div slot="footer">
              <b-button
                type="submit"
                size="sm"
                variant="primary">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button type="reset" size="sm" variant="danger" v-bind:href="'#/admin/customers'"><i
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

    import orgDeps from "../../../../mixins/orderedDepartments";
    import {validations} from '../validation'
    import axios from "../../../../backend/vue-axios/axios";

    export default {
        name: 'CustomersCreate',
        mixins: [orgDeps],
        data() {
            return {
                firstName: '',
                lastName: '',
                note: '',
                customerType: '',
                customerTypes: ['individual', 'organization'],
                departmentId: 'Please select an option',
                email: '',
                password: '',
                optionsApi: [],
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
                // this.errors = [];
                //
                // if (!this.name) {
                //     this.errors.push('Name is required.');
                // }
                //
                // if (!this.order) {
                //     this.errors.push('Order is required.');
                // }
                //
                // if (!this.errors.length && !this.error.length) {
                //     this.create();
                //     return true;
                // }

                console.log("Submit Create.");
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = "Error";
                    this.errors.push('Field requirements not satisfied. See, please red fields.')
                } else {
                    this.create();
                    this.submitStatus = "Creating";
                    console.log("submitStatus: " + this.submitStatus)
                    return true
                }

                console.log("submitStatus: " + this.submitStatus)
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
                    first_name: this.firstName,
                    last_name: this.lastName,
                    type: this.customerType,
                    note: this.note,
                    organization_id: this.departmentId,
                    email: this.email,
                    password: this.password
                };

                console.log(dataPost);
                axios.post('/customers', dataPost, headers)
                    .then(() => this.organizationsCreatingSuccessful())
                    .catch((request) => this.organizationsCreatingFailed(request));
            },

            organizationsCreatingSuccessful() {
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
</style>
