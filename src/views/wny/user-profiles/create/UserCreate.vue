<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="8">
        <b-card>
          <div slot="header">
            <strong>Create User</strong><small style="color: red" class="ml-1"> Asterisk * means required
            parameter</small>
          </div>
          <b-row class="form-group" style="padding-left: 10px; padding-right: 10px; ">
            <b-form
              @submit.prevent=checkForm
              novalidate=novalidate
            >
              <div class="alert alert-danger" v-if="errors.length">
                <b>Correct, please the following error(s):</b>
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </div>
              <div class="alert alert-danger" v-if="error">
                {{ error }}
              </div>
              <b-row>
                <b-col cols="5">
                  <section style="border: 1px solid lightgrey; padding: 15px;">
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Title"
                                      label-for="title"
                                      :label-cols="3"
                                      description="Letters, space, hyphen"
                                      style="font-weight: bold">
                          <b-form-input id="title"
                                        v-model="$v.title.$model"
                                        :class="status($v.title)"
                                        type="text">
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="First Name *"
                                      label-for="first_name"
                                      :label-cols="3"
                                      description="Letters, space, hyphen"
                                      style="font-weight: bold">
                          <b-form-input id="first_name"
                                        v-model="$v.first_name.$model"
                                        :class="status($v.first_name)"
                                        type="text">
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Last Name *"
                                      label-for="last_name"
                                      :label-cols="3"
                                      description="Letters, space, hyphen"
                                      style="font-weight: bold">
                          <b-form-input id="last_name"
                                        v-model="$v.last_name.$model"
                                        :class="status($v.last_name)"
                                        type="text">
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </section>
                  <section style="border: 1px solid lightgrey; padding: 15px; margin-top: 20px;">
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Cell Phone"
                                      description="ex. (999) 999-9999"
                                      :label-cols="3"
                                      style="font-weight: bold">
                          <b-input-group>
                            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class='fa fa-phone'></i>
                </span>
                            </div>
                            <masked-input id="phone_mob"
                                          type="tel"
                                          name="phone_mob"
                                          class="form-control"
                                          v-model="$v.phone_mob.$model"
                                          :mask="['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                          :class="status($v.phone_mob)"
                                          :guide="true"
                                          placeholderChar="#">
                            </masked-input>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Home Phone"
                                      description="ex. (999) 999-9999"
                                      :label-cols="3"
                                      style="font-weight: bold">
                          <b-input-group>
                            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class='fa fa-phone'></i>
                </span>
                            </div>
                            <masked-input id="phone_home"
                                          type="tel"
                                          name="phone_home"
                                          class="form-control"
                                          v-model="$v.phone_home.$model"
                                          :mask="['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                          :class="status($v.phone_home)"
                                          :guide="true"
                                          placeholderChar="#">
                            </masked-input>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Work Phone"
                                      description="ex. (999) 999-9999"
                                      :label-cols="3"
                                      style="font-weight: bold">
                          <b-input-group>
                            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class='fa fa-phone'></i>
                </span>
                            </div>
                            <masked-input id="phone_work"
                                          type="tel"
                                          name="phone_work"
                                          class="form-control"
                                          v-model="$v.phone_work.$model"
                                          :mask="['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                          :class="status($v.phone_work)"
                                          :guide="true"
                                          placeholderChar="#">
                            </masked-input>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Extension"
                                      :label-cols="3"
                                      description="Numbers"
                                      style="font-weight: bold">
                          <b-form-input id="phone_extension"
                                        type="text"
                                        name="phone_extension"
                                        class="form-control"
                                        v-model="$v.phone_extension.$model"
                                        :class="status($v.phone_extension)">
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </section>


                </b-col>
                <!--              <b-col cols="1"></b-col>-->
                <b-col cols="7">
                  <section style="border: 1px solid lightgrey; padding: 15px;">
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Start Date"
                                      label-for="start_date"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <v-date-picker id="startDate"
                                         v-model='$v.startDate.$model'
                                         popover-visibility='hover'
                                         :input-props='inputProps'
                                         :formats='formats'>
                          </v-date-picker>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Termination Date"
                                      label-for="termination_date"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <v-date-picker id="terminationDate"
                                         v-model='$v.terminationDate.$model'
                                         popover-visibility='hover'
                                         :input-props='inputProps'
                                         :formats='formatsT'
                                         :class="status($v.terminationDate)">
                          </v-date-picker>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Department *"
                                      label-for="department_id"
                                      :label-cols="4"
                                      description="Select one"
                                      style="font-weight: bold">
                          <b-form-select id="department_id"
                                         v-model="$v.departmentId.$model"
                                         :plain="true"
                                         :options=options
                                         :class="status($v.departmentId)">
                          </b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Status *"
                                      label-for="status"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <b-form-select id="statusProfile"
                                         v-model="$v.statusProfile.$model"
                                         :plain="true"
                                         :options=statuses
                                         :class="status($v.statusProfile)"
                                         value="Please select one">
                          </b-form-select>

                        </b-form-group>
                      </b-col>
                    </b-row>
                  </section>

                  <section style="border: 1px solid lightgrey; padding: 15px; margin-top: 20px;">
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Email Work"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <b-input-group>
                            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class='fa fa-envelope-o'></i>
                </span>
                            </div>
                            <b-form-input id="email_work"
                                          type="text"
                                          name="email_work"
                                          class="form-control"
                                          v-model="$v.email_work.$model"
                                          :class="status($v.email_work)">
                            </b-form-input>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Email Personal *"
                                      :label-cols="4"
                                      description="Email"
                                      style="font-weight: bold">
                          <b-input-group>
                            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class='fa fa-envelope-o'></i>
                </span>
                            </div>
                            <b-form-input id="email_personal"
                                          type="text"
                                          name="email_personal"
                                          class="form-control"
                                          v-model="$v.email_personal.$model"
                                          :class="status($v.email_personal)">
                            </b-form-input>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Address Line 1 *"
                                      label-for="address_line_1"
                                      :label-cols="4"
                                      description="Letters, spaces, numbers, dot, comma, slash, hyphen"
                                      style="font-weight: bold">
                          <b-form-input id="address_line_1"
                                        v-model="$v.address_line_1.$model"
                                        type="text"
                                        :class="status($v.address_line_1)">
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Address Line 2"
                                      label-for="address_line_2"
                                      :label-cols="4"
                                      description="Letters, spaces, numbers, dot, comma, slash, hyphen"
                                      style="font-weight: bold">
                          <b-form-input
                            id="address_line_2"
                            v-model="$v.address_line_2.$model"
                            type="text"
                            :class="status($v.address_line_2)">
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="City *"
                                      label-for="city"
                                      :label-cols="4"
                                      description="Letters, space, hyphen"
                                      style="font-weight: bold">
                          <b-form-input id="city"
                                        v-model="$v.city.$model"
                                        type="text"
                                        :class="status($v.city)">
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-row>
                          <b-col cols="6">
                            <b-form-group label="State *"
                                          label-for="state"
                                          :label-cols="4"
                                          description="Select one"
                                          style="font-weight: bold">
                              <b-form-select id="state"
                                             v-model="$v.state.$model"
                                             :plain="true"
                                             :options=states
                                             :class="status($v.state)">
                              </b-form-select>
                            </b-form-group>
                          </b-col>
                          <!--                        <b-col cols="1"></b-col>-->
                          <b-col cols="6">
                            <b-form-group label="Postal Code *"
                                          label-for="zip"
                                          :label-cols="6"
                                          description="Numbers"
                                          style="font-weight: bold">
                              <b-form-input id="zip"
                                            v-model="$v.zip.$model"
                                            type="text"
                                            :class="status($v.zip)">
                              </b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </section>


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
                          href="#/admin/user-profiles">
                  <i class="fa fa-ban"></i>
                  Cancel
                </b-button>
              </div>

            </b-form>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    const API_URL = process.env.VUE_APP_API_URL;

    import MaskedInput from 'vue-text-mask'
    import {setupCalendar, DatePicker} from 'v-calendar'
    import {states} from './../../../../shared/states'
    import {validations} from '../validation'
    import moment from "moment";
    import mixin from "../../../../mixins/mixin";
    import orderedDepartments from "../../../../mixins/orderedDepartments";

    setupCalendar({
        firstDayOfWeek: 2
    })

    export default {
        name: 'UserCreate',
        mixins: [mixin, orderedDepartments],
        components: {
            MaskedInput,
            'v-date-picker': DatePicker
        },
        data() {
            return {
                optionsApi: [], // item list for select
                errors: [],
                error: false,
                first_name: '',
                last_name: '',
                title: '',
                departmentId: '',
                phone_home: '',
                phone_work: '',
                phone_extension: '',
                phone_mob: '',
                email_personal: '',
                email_work: '',
                address_line_1: '',
                address_line_2: '',
                city: '',
                state: '',
                zip: '',
                statusProfile: '',
                startDate: '',
                inputProps: {
                    class: 'input',
                },
                inputFormat: "YYYY-MM-DD, YYYY/MM/DD",
                terminationDate: '',
                // termination_date: '',
                deleted_at: '',
                states: states,
                statuses: ['active', 'inactive', 'terminated']
            }
        },
        validations: validations,
        computed: {
            startDate: function () {
                let date = this.startDate;
                return this.formatDate(date);
            },
            terminationDate: function () {
                let date = this.terminationDate;
                return this.formatDate(date);
            },
            formats() {
                return {
                    input: this.inputFormat && this.inputFormat.split(','),
                };
            },
            formatsT() {
                return {
                    input: this.inputFormat && this.inputFormat.split(','),
                };
            }
        },
        watch: {
            formats() {
                this.start_date = new Date(this.start_date);
            },
            formatsT() {
                this.termination_date = new Date(this.termination_date);
            }
        },
        methods: {
            status(validation) {
                return {
                    error: validation.$error,
                    dirty: validation.$dirty
                }
            },
            formatDate: function (date) {
                if (date !== null) {
                    let date_parts = date.match(/^(\d{4})-(\d+)-(\d+)(.*)$/);
                    let year;
                    let month;
                    let day;

                    if (date_parts) {
                        year = date_parts[1].slice(-4);
                        month = date_parts[2].slice(-2);
                        day = date_parts[3].slice(-2);

                        return new Date(year, month - 1, day);
                    } else {
                        return date;
                    }
                } else {
                    return date;
                }
            },
            checkForm: function (e) {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = "Error";
                    this.errors.push('Field requirements not satisfied. See, please red fields.')
                } else {
                    this.create();
                    this.submitStatus = "Creating";

                    return true
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
                    title: this.title,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    department_id: this.departmentId,
                    status: this.statusProfile,
                    phone_home: this.phone_home,
                    phone_mob: this.phone_mob,
                    phone_work: this.phone_work,
                    phone_extension: this.phone_extension,
                    email_personal: this.email_personal,
                    email_work: this.email_work,
                    address_line_1: this.address_line_1,
                    address_line_2: this.address_line_2,
                    city: this.city,
                    state: this.state,
                    zip: this.zip,
                    start_date: this.startDate,
                    termination_date: this.terminationDate,
                };

                dataPost = this.nullToEmpty(dataPost);
                dataPost = this.formatDateOutput(dataPost);

                this.$http.post('/user-profiles', dataPost, headers)
                    .then(request => this.userProfilesCreatingSuccessful(request))
                    .catch((request) => this.userProfilesCreatingFailed(request));
            },
            userProfilesCreatingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('User Profile created.', 'success');

                this.$router.replace(this.$route.query.redirect || '/admin/user-profiles')
            },
            userProfilesCreatingFailed(req) {
                this.errors = false;
                this.error = 'User Profiles Creating failed! ' + req;
            },
            nullToEmpty(obj) {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key) && obj[key] === null) {
                        obj[key] = '';
                    }

                    if ((key === "start_date" || key === "termination_date") && obj[key] === '') {
                        obj[key] = null;
                    }
                }

                return obj;
            },
            formatDateOutput: function (obj) {
                if (obj.start_date !== null) {
                    obj.start_date = moment(obj.start_date).format("YYYY-MM-DD")
                }

                if (obj.termination_date !== null) {
                    obj.termination_date = moment(obj.termination_date).format("YYYY-MM-DD")
                }

                return obj;
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
            this.$http.get(API_URL + '/organizations', headers)
                .then(response => (
                    this.optionsApi = this.formatResponse(response.data.data)
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

  section.border {
    border: 2px solid #b6e4f4;
    padding: 10px;
  }
</style>
