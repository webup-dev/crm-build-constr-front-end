<template>
  <div>
    <b-form
      id="formAddUser"
      @submit.prevent=checkForm
      novalidate=novalidate
    >
      <b-row>
        <b-col>
          <b-row>
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
          </b-row>
          <b-row>
            <b-col class="md-6">
              <b-form-group
                label="User ID *"
                label-for="user_id"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  plaintext
                  id="user_id"
                  v-model=store.state.userDetails.userId
                  type="text">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Prefix *"
                label-for="prefix"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="prefix"
                  v-model="$v.prefix.$model"
                  type="text"
                  :class="status($v.prefix)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Suffix"
                label-for="suffix"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="suffix"
                  v-model="$v.suffix.$model"
                  type="text"
                  :class="status($v.suffix)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="First Name *"
                label-for="first_name"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="suffix"
                  v-model="$v.first_name.$model"
                  type="text"
                  :class="status($v.first_name)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Last Name *"
                label-for="last_name"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="last_name"
                  v-model="$v.last_name.$model"
                  type="text"
                  :class="status($v.last_name)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Work Title"
                label-for="work_title"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="last_name"
                  v-model="$v.work_title.$model"
                  type="text"
                  :class="status($v.work_title)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Work Department"
                label-for="work_department"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="last_name"
                  v-model="$v.work_department.$model"
                  type="text"
                  :class="status($v.work_department)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Work Role"
                label-for="work_role"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="last_name"
                  v-model="$v.work_role.$model"
                  type="text"
                  :class="status($v.work_role)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Email Work"
                label-for="email_work"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="email_work"
                  v-model="$v.email_work.$model"
                  type="text"
                  :class="status($v.email_work)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Email Personal *"
                label-for="email_personal"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="email_personal"
                  v-model="$v.email_personal.$model"
                  type="text"
                  :class="status($v.email_personal)">

                </b-form-input>
              </b-form-group>

              <b-form-group label="Status *"
                            label-for="statusDetails"
                            :label-cols="3"
                            class="label-bold"
              >
                <b-form-select id="statusDetails"
                               v-model="$v.statusDetails.$model"
                               :plain="true"
                               :options=statusOptions
                               :class="status($v.statusDetails)">
                </b-form-select>
              </b-form-group>

            </b-col>
            <b-col class="md-6">
              <b-form-group
                label="Phone Home"
                label-for="phone_home"
                :label-cols="3"
                class="label-bold"
              >
                <masked-input
                  id="phone_home"
                  v-model="$v.phone_home.$model"
                  :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                  type="text"
                  :class="status($v.phone_home)"
                  class="form-control"
                >

                </masked-input>
              </b-form-group>

              <b-form-group
                label="Phone Work"
                label-for="phone_work"
                :label-cols="3"
                class="label-bold"
              >
                <masked-input
                  id="phone_work"
                  v-model="$v.phone_work.$model"
                  :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                  type="text"
                  :class="status($v.phone_work)"
                  class="form-control">

                </masked-input>
              </b-form-group>

              <b-form-group
                label="Phone Extension"
                label-for="phone_extension"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="phone_extension"
                  v-model="$v.phone_extension.$model"
                  type="text"
                  :class="status($v.phone_extension)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Phone Mobile"
                label-for="phone_mob"
                :label-cols="3"
                class="label-bold"
              >
                <masked-input
                  id="phone_mob"
                  v-model="$v.phone_mob.$model"
                  :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                  type="text"
                  :class="status($v.phone_mob)"
                  class="form-control">

                </masked-input>
              </b-form-group>

              <b-form-group
                label="Phone Fax"
                label-for="phone_fax"
                :label-cols="3"
                class="label-bold"
              >
                <masked-input
                  id="statusDetails"
                  v-model="$v.phone_fax.$model"
                  :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                  type="text"
                  :class="status($v.phone_fax)"
                  class="form-control">

                </masked-input>
              </b-form-group>

              <b-form-group
                label="Address Line 1 *"
                label-for="line_1"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="line_1"
                  v-model="$v.line_1.$model"
                  type="text"
                  :class="status($v.line_1)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Address Line 2 *"
                label-for="line_2"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="statusDetails"
                  v-model="$v.line_2.$model"
                  type="text"
                  :class="status($v.line_2)">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="City *"
                label-for="city"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="city"
                  v-model="$v.city.$model"
                  type="text"
                  :class="status($v.city)">

                </b-form-input>
              </b-form-group>

              <b-form-group label="State *"
                            label-for="stateAddress"
                            :label-cols="3"
                            class="label-bold"
              >
                <b-form-select id="state"
                               v-model="$v.stateAddress.$model"
                               :plain="true"
                               :options=states
                               :class="status($v.stateAddress)">
                </b-form-select>
              </b-form-group>

              <b-form-group
                label="Postal Code *"
                label-for="zip"
                :label-cols="3"
                class="label-bold"
              >
                <b-form-input
                  id="zip"
                  v-model="$v.zip.$model"
                  type="text"
                  :class="status($v.zip)">

                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <div slot="footer">
            <b-button type="submit"
                      variant="primary"
                      style="margin-right: 10px">
              Save User
            </b-button>
            <b-button type="reset"
                      variant="info"
                      v-bind:href="'#/admin/customers/' + store.state.userDetails.customerId + '/show'"
                      style="margin-right: 10px">
              Back
            </b-button>
            <b-button type="reset"
                      variant="danger"
                      v-on:click="closeForm">
              Cancel
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
  import MaskedInput from 'vue-text-mask';
  import {validations} from '../components/validations/addDetails';
  import {addDetails} from "../api/addDetails";
  import store from "../store";
  import myHelper from "../mixins/myHelper";
  import {states} from './../shared/states';

  export default {
    // name: "CustomerUserAdd"
    name: "AddDetails",
    components: {
      MaskedInput,
    },
    mixins: [myHelper],
    data: function () {
      return {
        errors: [],
        error: '',
        user_id: '',
        prefix: '',
        suffix: '',
        first_name: '',
        last_name: '',
        work_title: '',
        work_department: '',
        work_role: '',
        email_work: '',
        email_personal: '',
        statusDetails: '',
        statusOptions: [{value: 'active', text: 'active'}, {value: 'inactive', text: 'inactive'}],
        phone_home: '',
        phone_work: '',
        phone_mob: '',
        phone_fax: '',
        line_1: '',
        line_2: '',
        city: '',
        stateAddress: '',
        states: states,
        zip: '',
        success: false,
        store: store
      }
    },
    validations: validations,
    methods: {
      formatPhone(phone) {
        return this.formatSinglePhone(phone)
      },
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      checkForm: function (e) {
        // validation
        this.errors = [];

        // prefix
        if (!this.$v.prefix.required) {
          this.errors.push('Prefix is required.');
        }
        if (!this.$v.prefix.alpha) {
          this.errors.push('Prefix consists of letters only.');
        }

        // suffix
        if (!this.$v.suffix.required) {
          this.errors.push('Suffix is required.');
        }
        if (!this.$v.suffix.alphaSpaceDotHyphen) {
          this.errors.push('Suffix consists of letters, space, dot, hyphen only.');
        }

        // first_name
        if (!this.$v.first_name.required) {
          this.errors.push('First Name is required.');
        }
        if (!this.$v.first_name.alpha) {
          this.errors.push('First Name consists of letters only.');
        }

        // last_name
        if (!this.$v.last_name.required) {
          this.errors.push('Last Name is required.');
        }
        if (!this.$v.last_name.alpha) {
          this.errors.push('Last Name consists of letters only.');
        }

        // work_title
        if (!this.$v.work_title.companyName) {
          this.errors.push('Work Title consists of letters, dot, comma, apostrophe, number, hyphen only.');
        }

        // work_department
        if (!this.$v.work_department.companyName) {
          this.errors.push('Work Department consists of letters, dot, comma, apostrophe, number, hyphen only.');
        }

        // work_role
        if (!this.$v.work_role.alpha) {
          this.errors.push('Work Role consists of letters only.');
        }

        // email_work
        if (!this.$v.email_work.email) {
          this.errors.push('Work Email must be email.');
        }

        // email_personal
        if (!this.$v.email_personal.required) {
          this.errors.push('Personal Email is required.');
        }

        if (!this.$v.email_personal.email) {
          this.errors.push('Personal Email must be email.');
        }

        // statusDetails
        if (!this.$v.statusDetails.required) {
          this.errors.push('Status must be selected.');
        }

        // phone_home
        if (!this.$v.phone_home.usaPhone) {
          this.errors.push('Phone Home must be phone number.');
        }

        // phone_work
        if (!this.$v.phone_work.usaPhone) {
          this.errors.push('Phone Work must be phone number.');
        }

        // phone_extension
        if (!this.$v.phone_extension.usaPhone) {
          this.errors.push('Phone Extension must be phone number.');
        }

        // phone_mob
        if (!this.$v.phone_mob.usaPhone) {
          this.errors.push('Phone Mobile must be phone number.');
        }

        // phone_fax
        if (!this.$v.phone_fax.usaPhone) {
          this.errors.push('Phone Fax must be phone number.');
        }

        // line_1
        if (!this.$v.line_1.required) {
          this.errors.push('Address Line 1 is required.');
        }

        if (!this.$v.line_1.address) {
          this.errors.push('Address Line 1 must be address string.');
        }

        // line_2
        if (!this.$v.line_2.required) {
          this.errors.push('Address Line 2 is required.');
        }

        if (!this.$v.line_2.address) {
          this.errors.push('Address Line 2 must be address string.');
        }

        // city
        if (!this.$v.city.required) {
          this.errors.push('City is required.');
        }

        if (!this.$v.city.city) {
          this.errors.push('City must be a city name.');
        }

        // stateAddress
        if (!this.$v.stateAddress.required) {
          this.errors.push('State must be selected.');
        }

        // zip
        if (!this.$v.zip.required) {
          this.errors.push('Postal Code is required.');
        }

        if (!this.$v.zip.numeric) {
          this.errors.push('Postal Code consist of digits.');
        }

        if (!this.errors.length && !this.error.length) {
          this.create();
          return true;
        }

        e.preventDefault();
      },
      create() {
        let user_id = store.state.userDetails.userId;
        let prefix = this.prefix;
        let first_name = this.first_name;
        let last_name = this.last_name;
        let suffix = this.suffix;
        let work_title = this.work_title;
        let work_department = this.work_department;
        let work_role = this.work_role;
        let phone_home = this.phone_home;
        let phone_work = this.phone_home;
        let phone_extension = this.phone_extension;
        let phone_mob = this.phone_mob;
        let phone_fax = this.phone_fax;
        let email_work = this.email_work;
        let email_personal = this.email_personal;
        let line_1 = this.line_1;
        let line_2 = this.line_2;
        let city = this.city;
        let state = this.stateAddress;
        let zip = this.zip;
        let status = this.statusDetails;

        addDetails(user_id, prefix, first_name, last_name, suffix, work_title, work_department, work_role, phone_home, phone_work, phone_extension, phone_mob, phone_fax, email_work, email_personal, line_1, line_2, city, state, zip, status)
          .then(request => this.createSuccess(request))
          .catch((request) => this.createFail(request));
      },
      createSuccess(req) {
        this.errors = false;
        this.error = false;
        this.flash('New UserDetails are created.', 'success');
        this.$router.replace(this.$route.query.redirect || '/admin/customers/' + + store.state.userDetails.customerId + '/show');
      },

      createFail(req) {
        this.errors = false;
        this.error = 'New UserDetails creating failed! ' + req;
        console.log(req);
      }
    }
  }
</script>

<style scoped>
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
