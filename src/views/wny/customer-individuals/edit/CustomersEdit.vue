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
            <b-form-group label="Customer Name"
                          label-for="name"
                          :label-cols="3">
              <b-form-input plaintext
                            id="name"
                            v-model="$v.name.$model"
                            :class="status($v.name)"
                            type="text">

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
    import {validations} from '../validationEdit'
    import axios from "../../../../backend/vue-axios/axios";

    export default {
        name: 'CustomersCreate',
        mixins: [orgDeps],
        data() {
            return {
                user_id: '',
                name: '',
                note: '',
                customerType: '',
                customerTypes: ['individual', 'organization'],
                departmentId: 'Please select an option',
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
                    user_id: this.user_id,
                    name: this.name,
                    type: this.customerType,
                    note: this.note,
                    organization_id: this.departmentId
                };

                console.log(dataPost);
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
                console.log(req);
            },

            getFirstName(name) {
                let arr = name.split(" ");
                return arr[0];
            },

            getLastName(name) {
                let arr = name.split(" ");
                return arr[1];
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
                    this.user_id = response.data.data.user_id,
                        this.name = response.data.data.name,
                        this.note = response.data.data.note,
                        this.customerType = response.data.data.type,
                        this.departmentId = response.data.data.organization_id
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
