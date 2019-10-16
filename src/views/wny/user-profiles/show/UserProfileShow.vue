<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>User Profile</strong>
          </div>
          <b-row class="form-group">
            <b-col cols="6">
              <b-form-group label="User ID:"
                            label-for="user_id"
                            :label-cols="4"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="user_id"
                              v-model="user_id"
                              type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Title:"
                            label-for="title"
                            :label-cols="4">
                <b-form-input plaintext
                              id="title"
                              v-model="title"
                              type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="6">
              <b-form-group label="First Name:"
                            label-for="first_name"
                            :label-cols="4"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="first_name"
                              v-model="first_name"
                              type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Last Name:"
                            label-for="last_name"
                            :label-cols="4">
                <b-form-input plaintext
                              id="last_name"
                              v-model="last_name"
                              type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="form-group">
            <b-col cols="6">
              <b-form-group label="Department:"
                            label-for="department_id"
                            :label-cols="4"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="department_id"
                              v-model="departmentName">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Status:"
                            label-for="status"
                            :label-cols="4">
                <b-form-input plaintext
                              id="statusProfile"
                              v-model="statusProfile">
                </b-form-input>

              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="form-group">
            <b-col cols="6">
              <b-form-group label="Home Phone:"
                            :label-cols="4"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="phone_home"
                              v-model="phone_home">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Cell Phone:"
                            :label-cols="4">
                <b-form-input plaintext
                              id="phone_mob"
                              v-model="phone_mob">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="form-group">
            <b-col cols="6">
              <b-form-group label="Work Phone:"
                            :label-cols="4"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="phone_work"
                              v-model="phone_work">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Extension:"
                            :label-cols="4">
                <b-form-input plaintext
                              id="phone_extension"
                              v-model="phone_extension">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="6">
              <b-form-group label="Email Personal:"
                            :label-cols="4"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="email_personal"
                              v-model="email_personal">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Email Work:"
                            :label-cols="4">
                <b-form-input plaintext
                              id="email_work"
                              v-model="email_work">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="6">
              <b-form-group label="Address Line 1:"
                            :label-cols="4"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="address_line_1"
                              v-model="address_line_1">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Address Line 2:"
                            :label-cols="4">
                <b-form-input plaintext
                              id="address_line_2"
                              v-model="address_line_2">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="form-group">
            <b-col cols="4">
              <b-form-group label="City:"
                            label-for="city"
                            :label-cols="5"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="city"
                              v-model="city"
                              type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group label="State:"
                            label-for="state"
                            :label-cols="5">
                <b-form-input plaintext
                              id="state"
                              v-model="state">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group label="Postal Code:"
                            label-for="zip"
                            :label-cols="5">
                <b-form-input plaintext
                              id="zip"
                              v-model="zip"
                              type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="form-group">
            <b-col cols="6">
              <b-form-group label="Start Date"
                            label-for="start_date"
                            :label-cols="4"
                            style="padding-left: 15px">
                <b-form-input plaintext
                              id="startDate"
                              v-model='startDate'>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Termination Date:"
                            label-for="termination_date"
                            :label-cols="4">
                <b-form-input plaintext
                              id="terminationDate"
                              v-model='terminationDate'>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <div slot="footer">
            <b-button type="submit"
                      size="sm"
                      variant="danger"
                      v-bind:href="'#/admin/user-profiles/' + this.$route.params.id + '/edit'">
              <i class="fa fa-pencil"></i> Update
            </b-button>
            <b-button type="reset"
                      size="sm"
                      variant="primary"
                      href="#/admin/user-profiles">
              <i class="fa fa-ban"></i>
              Reset
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    const API_URL = process.env.VUE_APP_API_URL;

    import {states} from './../../../../shared/states'

    export default {
        name: 'UserProfilesShow',
        components: {},
        data() {
            return {
                optionsApi: [], // item list for select
                errors: [],
                error: false,
                id: this.$route.params.id,
                user_id: '',
                first_name: '',
                last_name: '',
                title: '',
                departmentId: '',
                departmentName: '',
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
                // start_date: '',
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
        computed: {
            // create item list for select
            options: function () {
                let trick = this.optionsApi;
                console.log(trick);
                let optionsArr = [
                    {value: 0, text: "Select Organization"}
                ];

                trick.forEach(function (item, index, array) {
                    // console.log(item.id + " " + item.name)

                    let row = {
                        value: item.id,
                        text: item.name
                    };

                    optionsArr.push(row)
                });
                console.log("optionsArr: ");
                console.log(optionsArr);

                return optionsArr;
            },
            // create selected item from the list
            departmentId: function () {
                let trick = this.optionsApi;
                let departmentId = trick.find(x => x.id === this.$route.params.id).department_id;

                return departmentId
            }
        },
        methods: {
            formatDate: function (date) {
                let arr = date.split(" ");

                return arr[0];
            },
            formatPhoneNumber: function (phoneNumberString) {
                let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
                let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
                if (match) {
                    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
                }
                return null
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
                    this.optionsApi = response.data.data
                ));

        },
        mounted() {
            let headers = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                }
            };

            this.$http.get(API_URL + '/user-profiles/' + this.$route.params.id, headers)
                .then(response => (
                    this.user_id = response.data.data.user_id,
                        this.first_name = response.data.data.first_name,
                        this.last_name = response.data.data.last_name,
                        this.title = response.data.data.title,
                        this.departmentId = response.data.data.department_id,
                        this.departmentName = response.data.data.organization.name,
                        this.phone_home = this.formatPhoneNumber(response.data.data.phone_home),
                        this.phone_work = this.formatPhoneNumber(response.data.data.phone_work),
                        this.phone_extension = response.data.data.phone_extension,
                        this.phone_mob = this.formatPhoneNumber(response.data.data.phone_mob),
                        this.email_personal = response.data.data.email_personal,
                        this.email_work = response.data.data.email_work,
                        this.address_line_1 = response.data.data.address_line_1,
                        this.address_line_2 = response.data.data.address_line_2,
                        this.city = response.data.data.city,
                        this.state = response.data.data.state,
                        this.zip = response.data.data.zip,
                        this.statusProfile = response.data.data.status,
                        this.startDate = this.formatDate(response.data.data.start_date),
                        this.terminationDate = this.formatDate(response.data.data.termination_date)
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
