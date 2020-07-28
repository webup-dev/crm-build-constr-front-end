<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="8">
        <b-card>
          <flash-message></flash-message>
          <div slot="header">
            <strong>Create Lead</strong><small style="color: red" class="ml-1"> Asterisk * means required
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
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
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
                        <b-form-group label="Name *"
                                      label-for="name"
                                      :label-cols="3"
                                      style="font-weight: bold">
                          <b-form-input id="name"
                                        v-model="$v.name.$model"
                                        :class="status($v.name)"
                                        type="text">
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <!--                        <label>City</label>-->
                        <!--                        <v-select :options="optionsLeadType" v-model="leadTypeId"></v-select>-->
                        <b-form-group label="Lead Type *"
                                      label-for="lead_type_id"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <b-form-select id="lead_type_id"
                                         v-model="$v.leadTypeId.$model"
                                         :plain="true"
                                         :options=optionsLeadType
                                         :class="status($v.leadTypeId)">
                          </b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Lead Status *"
                                      label-for="lead_status_id"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <b-form-select id="lead_status_id"
                                         v-model="$v.leadStatusId.$model"
                                         @change="isStatusChanged($event)"
                                         :plain="true"
                                         :options=optionsLeadStatus
                                         :class="status($v.leadStatusId)">
                          </b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Declined Reason *"
                                      label-for="declinedReason"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <b-form-select id="declinedReason"
                                         v-model="$v.declinedReason.$model"
                                         :plain="true"
                                         :options=optionsDeclinedReason
                                         :class="status($v.declinedReason)">
                          </b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row v-if="this.leadStatusId === 3">
                      <b-col cols="12">
                        <b-form-group label="Declined Reason Other"
                                      label-for="declinedReasonOther"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <b-form-input id="name"
                                        v-model="$v.declinedReasonOther.$model"
                                        :class="status($v.declinedReasonOther)"
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
                        <b-form-group label="Organization *"
                                      label-for="organizationId"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <b-form-select id="organizationId"
                                         v-model="organizationId"
                                         :plain="true"
                                         @change="isOrganizationChanged($event)"
                                         :options=organizationOptions
                                         :class="status($v.organizationId)">
                          </b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Due Date"
                                      label-for="due_date"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <v-date-picker id="dueDate"
                                         v-model='$v.dueDate.$model'
                                         popover-visibility='hover'
                                         :input-props='inputProps'
                                         :formats='formats'>
                          </v-date-picker>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Anticipated Project Date"
                                      label-for="anticipated_project_date"
                                      :label-cols="4"
                                      style="font-weight: bold">
                          <v-date-picker id="anticipatedProjectDate"
                                         v-model='$v.anticipatedProjectDate.$model'
                                         popover-visibility='hover'
                                         :input-props='inputProps'
                                         :formats='formatsT'
                                         :class="status($v.anticipatedProjectDate)">
                          </v-date-picker>
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
  import store from "../../../store";

  const API_URL = process.env.VUE_APP_API_URL;
  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  import MaskedInput from 'vue-text-mask'
  import {setupCalendar, DatePicker} from 'v-calendar'
  import {states} from '../../../shared/states'
  import {validations} from '../../../components/validations/leads'
  import {addLead, getOrganizations} from "../../../api/leads";
  import {getTrades} from "../../../api/trades";
  import {getLeadStatuses} from "../../../api/leadStatuses";
  import moment from "moment";
  import mixin from "../../../mixins/mixin";
  import orderedDepartments from "../../../mixins/orderedDepartments";

  setupCalendar({
    firstDayOfWeek: 2
  })

  export default {
    name: 'LeadCreate',
    mixins: [mixin, orderedDepartments],
    components: {
      MaskedInput,
      'v-date-picker': DatePicker
    },
    data() {
      return {
        errors: [],
        error: false,
        name: '',
        organizationId: null,
        organizationOptions: [],
        leadTypeId: '',
        optionsLeadType: [],
        leadStatusesId: '',
        optionsLeadStatus: [],
        declinedReason: '',
        optionsDeclinedReason: [],
        declinedReasonOther: '',
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
        dueDate: '',
        anticipatedProjectDate: '',
        inputProps: {
          class: 'input',
        },
        inputFormat: "YYYY-MM-DD, YYYY/MM/DD",
        deleted_at: '',
        states: states,
        statuses: ['active', 'inactive', 'terminated']
      }
    },
    validations: validations,
    computed: {
      dueDate: function () {
        let date = this.dueDate;
        return this.formatDate(date);
      },
      anticipatedProjectDate: function () {
        let date = this.anticipatedProjectDate;
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
        this.due_date = new Date(this.due_date);
      },
      formatsT() {
        this.anticipated_project_date = new Date(this.anticipated_project_date);
      }
    },
    methods: {
      status(validation) {
        console.log(validation);
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
          name: this.name,
          organization_id: this.organizationId,
          lead_type_id: this.leadTypeId,
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
          due_date: this.dueDate,
          anticipated_project_date: this.anticipatedProjectDate,
        };

        dataPost = this.nullToEmpty(dataPost);
        dataPost = this.formatDateOutput(dataPost);

        this.$http.post('/user-profiles', dataPost, headers)
            .then(() => this.userProfilesCreatingSuccessful())
            .catch((request) => this.userProfilesCreatingFailed(request));
      },
      userProfilesCreatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('User Profile created.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

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

          if ((key === "due_date" || key === "anticipated_project_date") && obj[key] === '') {
            obj[key] = null;
          }
        }

        return obj;
      },
      formatDateOutput: function (obj) {
        if (obj.due_date !== null) {
          obj.due_date = moment(obj.due_date).format("YYYY-MM-DD")
        }

        if (obj.anticipated_project_date !== null) {
          obj.anticipated_project_date = moment(obj.anticipated_project_date).format("YYYY-MM-DD")
        }

        return obj;
      },
      isSingle(list) {
        if (list.length === 1) {
          this.organizationId = list[0].value;
        }
      },
      isStatusChanged: function (event) {
        const leadStatus = this.leadStatusId;
      },
      isOrganizationChanged: function (event) {
        const orgId = this.organizationId;

        const options = store.state.trades;
        let newArr = [];
        options.forEach(function (obj, index) {
          if (obj.organizationId === orgId) {
            newArr.push(obj);
          }
        });
        this.optionsLeadType = newArr;

        const optionsLeadStatus = store.state.leadStatuses;
        let newArrLeadStatuses = [];
        optionsLeadStatus.forEach(function (obj, index) {
          if (obj.organizationId === orgId) {
            newArrLeadStatuses.push(obj);
          }
        });
        this.optionsLeadStatus = newArrLeadStatuses;
      },
      downloadData() {
        getOrganizations()
          .then(response => {
            const list = this.formatOrganizations(response.data.data);
            this.organizationOptions = list;
            this.isSingle(list);
          })
          .catch(error => console.log(error));

        getTrades()
          .then(response => {
            const options = this.formatLeadTypes(response.data.data);
            store.commit('setTrades', options);
            if (this.organizationOptions.length === 1) {
              this.optionsLeadType = store.state.trades;
            }
          })
          .catch(error => console.log(error));

        getLeadStatuses()
          .then(response => {
            const options = this.formatLeadStatuses(response.data.data);
            store.commit('setLeadStatuses', options);
            const optionsDeclined = this.formatLeadStatusDeclined(response.data.data);
            store.commit('setDeclinedReasons', optionsDeclined);
            if (this.organizationOptions.length === 1) {
              this.optionsDeclinedReason = store.state.leadStatuses;
            }
          })
          .catch(error => console.log(error));
      },
      formatOrganizations(organizations) {
        let newArr = [];
        organizations.forEach(function (obj, index) {
          newArr.push({
            value: obj.id,
            text: obj.name
          });
        });
        return newArr;
      },
      formatLeadTypes(leadTypes) {
        let newArr = [];
        leadTypes.forEach(function (obj, index) {
          newArr.push({
            value: obj.id,
            text: obj.name,
            organizationId: obj.organization_id
          });
        });
        return newArr;
      },
      formatLeadStatuses(leadStatuses) {
        let newArr = [];
        leadStatuses.forEach(function (obj, index) {
          if (obj.parent_id === null) {
            newArr.push({
              value: obj.id,
              text: obj.name,
              organizationId: obj.organization_id
            });
          }
        });
        return newArr;
      },
      formatLeadStatusDeclined(leadStatuses) {
        let newArr = [];
        leadStatuses.forEach(function (obj, index) {
          if (obj.parent_id != null) {
            newArr.push({
              value: obj.id,
              text: obj.name,
              organizationId: obj.organization_id
            });
          }
        });
        return newArr;
      },
    },
    mounted() {
      this.downloadData();
    },

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
