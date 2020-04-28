<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="8">
        <b-card>
          <flash-message></flash-message>
          <div slot="header">
            <strong>Create Requester</strong>
          </div>
          <b-form
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
                      <b-form-group label="First Name"
                                    label-for="firstName"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-form-input id="firstName"
                                      v-model="$v.firstName.$model"
                                      :class="status($v.firstName)"
                                      type="text">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Last Name"
                                    label-for="lastName"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-form-input id="lastName"
                                      v-model="$v.lastName.$model"
                                      :class="status($v.lastName)"
                                      type="text">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Prefix"
                                    label-for="prefix"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-form-input id="prefix"
                                      v-model="$v.prefix.$model"
                                      :class="status($v.prefix)"
                                      type="text">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Suffix"
                                    label-for="suffix"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-form-input id="suffix"
                                      v-model="$v.suffix.$model"
                                      :class="status($v.suffix)"
                                      type="text">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>

                </section>
                <section style="border: 1px solid lightgrey; padding: 15px; margin-top: 20px;">
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Cell Phone 1"
                                    description="ex. (999) 999-9999"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-input-group>
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class='fa fa-phone'></i>
                            </span>
                          </div>
                          <masked-input id="phoneMob1"
                                        type="tel"
                                        name="phoneMob1"
                                        class="form-control"
                                        v-model="$v.phoneMob1.$model"
                                        :mask="['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                        :class="status($v.phoneMob1)"
                                        :guide="true"
                                        placeholderChar="#">
                          </masked-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Cell Phone 2"
                                    description="ex. (999) 999-9999"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-input-group>
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class='fa fa-phone'></i>
                            </span>
                          </div>
                          <masked-input id="phoneMob2"
                                        type="tel"
                                        name="phoneMob2"
                                        class="form-control"
                                        v-model="$v.phoneMob2.$model"
                                        :mask="['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                        :class="status($v.phoneMob2)"
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
                          <masked-input id="phoneHome"
                                        type="tel"
                                        name="phoneHome"
                                        class="form-control"
                                        v-model="$v.phoneHome.$model"
                                        :mask="['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                        :class="status($v.phoneHome)"
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
                          <masked-input id="phoneWork"
                                        type="tel"
                                        name="phoneWork"
                                        class="form-control"
                                        v-model="$v.phoneWork.$model"
                                        :mask="['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                        :class="status($v.phoneWork)"
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
                        <b-form-input id="phoneExtension"
                                      type="text"
                                      name="phoneExtension"
                                      class="form-control"
                                      v-model="$v.phoneExtension.$model"
                                      :class="status($v.phoneExtension)">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Fax"
                                    description="ex. (999) 999-9999"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-input-group>
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class='fa fa-phone'></i>
                            </span>
                          </div>
                          <masked-input id="fax"
                                        type="tel"
                                        name="fax"
                                        class="form-control"
                                        v-model="$v.fax.$model"
                                        :mask="['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                        :class="status($v.fax)"
                                        :guide="true"
                                        placeholderChar="#">
                          </masked-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </section>
              </b-col>
              <!--                            <b-col cols="1"></b-col>-->
              <b-col cols="7">
                <section style="border: 1px solid lightgrey; padding: 15px;">
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Organization *"
                                    label-for="organizationId"
                                    :label-cols="4"
                                    style="font-weight: bold">
                        <b-form-select id="organizationId"
                                       v-model="$v.organizationId.$model"
                                       :plain="true"
                                       :options=organizationOptions
                                       :class="status($v.organizationId)">
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
                          <b-form-input id="emailWork"
                                        type="text"
                                        name="emailWork"
                                        class="form-control"
                                        v-model="$v.emailWork.$model"
                                        :class="status($v.emailWork)">
                          </b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Email Personal"
                                    :label-cols="4"
                                    description="Email"
                                    style="font-weight: bold">
                        <b-input-group>
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class='fa fa-envelope-o'></i>
                            </span>
                          </div>
                          <b-form-input id="emailPersonal"
                                        type="text"
                                        name="emailPersonal"
                                        class="form-control"
                                        v-model="$v.emailPersonal.$model"
                                        :class="status($v.emailPersonal)">
                          </b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Address Line 1 *"
                                    label-for="addressLine1"
                                    :label-cols="4"
                                    style="font-weight: bold">
                        <b-form-input id="addressLine1"
                                      v-model="$v.addressLine1.$model"
                                      type="text"
                                      :class="status($v.addressLine1)">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Address Line 2"
                                    label-for="addressLine2"
                                    :label-cols="4"
                                    style="font-weight: bold">
                        <b-form-input
                          id="address_line_2"
                          v-model="$v.addressLine2.$model"
                          type="text"
                          :class="status($v.addressLine2)">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="City *"
                                    label-for="city"
                                    :label-cols="4"
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
                      <b-form-group label="State *"
                                    label-for="addressState"
                                    :label-cols="4"
                                    description="Select one"
                                    style="font-weight: bold">
                        <b-form-select id="state"
                                       v-model="$v.addressState.$model"
                                       :plain="true"
                                       :options=states
                                       :class="status($v.addressState)">
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Postal Code *"
                                    label-for="zip"
                                    :label-cols="4"
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
                </section>

                <section style="border: 1px solid lightgrey; padding: 15px; margin-top: 20px;">
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Website"
                                    label-for="website"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-form-input id="website"
                                      v-model="$v.website.$model"
                                      :class="status($v.website)"
                                      type="text">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Other Source"
                                    label-for="otherSource"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-form-input id="otherSource"
                                      v-model="$v.otherSource.$model"
                                      :class="status($v.otherSource)"
                                      type="text">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-form-group label="Note"
                                    label-for="note"
                                    :label-cols="3"
                                    style="font-weight: bold">
                        <b-form-input id="note"
                                      v-model="$v.note.$model"
                                      :class="status($v.note)"
                                      type="text">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </section>
              </b-col>
            </b-row>
            <hr>

            <div slot="footer">
              <b-button id="save"
                        v-on:click="checkForm()"
                        class="mr-10"
                        size="sm"
                        variant="primary">
                <i class="fa fa-dot-circle-o"></i>
                Save
              </b-button>
              <b-button class="btn btn-info mr-10"
                        size="sm"
                        v-on:click="closeForm">
                Close form
              </b-button>
              <b-button class="btn btn-danger"
                        size="sm"
                        v-on:click="cancel">
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
  import MaskedInput from 'vue-text-mask'
  import {states} from '../../../shared/states'
  import {validations} from '../../../components/validations/requesters';
  import {getRequesterById, getOrganizations, updateRequester} from "../../../api/requesters";
  import store from "../../../store";
  import {updateWorkflow} from "../../../api/workflows";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: 'RequesterUpdate',
    components: {
      MaskedInput,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        suffix: '',
        prefix: '',
        organizationOptions: [{value: 0, text: 'org 1'}, {value: 1, text: 'org 2'}],
        organizationId: '',
        phoneMob1: '',
        phoneMob2: '',
        phoneHome: '',
        phoneWork: '',
        phoneExtension: '',
        fax: '',
        emailWork: '',
        emailPersonal: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        addressState: '',
        states: states,
        zip: '',
        website: '',
        otherSource: '',
        note: '',
        createdById: '',
        updatedById: '',
        errors: [],
        error: false
      }
    },
    validations: validations,
    methods: {
      cancel() {
        let requester = store.state.requester;
        this.firstName = requester.first_name;
        this.lastName = requester.last_name;
        this.prefix = requester.prefix;
        this.suffix = requester.suffix;
        this.organizationId = requester.organization_id;
        this.emailWork = requester.email_work;
        this.emailPersonal = requester.email_personal;
        this.addressLine1 = requester.line_1;
        this.addressLine2 = requester.line_2;
        this.city = requester.city;
        this.addressState = requester.state;
        this.zip = requester.zip;
        this.phoneHome = requester.phone_home;
        this.phoneWork = requester.phone_work;
        this.phoneExtension = requester.phone_extension;
        this.fax = requester.phone_fax;
        this.phoneMob1 = requester.phone_mob1;
        this.phoneMob2 = requester.phone_mob2;
        this.website = requester.website;
        this.otherSource = requester.other_source;
        this.note = requester.note;
        this.errors = [];
        this.$nextTick(() => {
          this.$v.$reset()
        });
      },
      closeForm() {
        this.cancel();
        this.$router.replace(this.$route.query.redirect || '/admin/requesters')
      },
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },

      checkForm: function (keyWord, e) {
        this.errors = [];

        if (!this.$v.firstName.name) {
          this.errors.push('Name consists of letters, hyphen, apostrophe and space only.');
        }

        if (!this.$v.lastName.name) {
          this.errors.push('Name consists of letters, hyphen, apostrophe and space only.');
        }

        if (!this.$v.prefix.namePrefix) {
          this.errors.push('Name consists of letters, slash, dot, comma, hyphen, apostrophe and space only.');
        }

        if (!this.$v.suffix.namePrefix) {
          this.errors.push('Name consists of letters, slash, dot, comma, hyphen, apostrophe and space only.');
        }

        if (!this.$v.organizationId.required) {
          this.errors.push('Organization is required.');
        }

        if (!this.$v.organizationId.integer) {
          this.errors.push('Wrong set of organizations.');
        }

        if (!this.$v.emailWork.email) {
          this.errors.push('Wrong Email Work.');
        }

        if (!this.$v.emailPersonal.email) {
          this.errors.push('Wrong Email Personal.');
        }

        if (!this.$v.addressLine1.required) {
          this.errors.push('Address Line 1 is required.');
        }

        if (!this.$v.addressLine1.address) {
          this.errors.push('Address Line 1 consist of digits, slash, comma, dot, number, hyphen');
        }

        if (!this.$v.addressLine2.address) {
          this.errors.push('Address Line 2 consist of alphas, digits, slash, comma, dot, number, hyphen');
        }

        if (!this.$v.city.required) {
          this.errors.push('City is required.');
        }

        if (!this.$v.city.city) {
          this.errors.push('City consist of alphas, space, hyphen, apostrophe');
        }

        if (!this.$v.zip.required) {
          this.errors.push('Postal Code is required.');
        }

        if (!this.$v.addressState.required) {
          this.errors.push('State is required.');
        }

        if (!this.$v.zip.usaZip) {
          this.errors.push('ZIP consist of 5 digits');
        }

        if (!this.$v.website.url) {
          this.errors.push('Website must be URL');
        }

        if (!this.$v.otherSource.alphaNumSpaceDotCommaHyphenApostrophe) {
          this.errors.push('Other source consist of alphas, digits, slash, comma, dot, number, hyphen');
        }

        if (!this.$v.note.alphaNumSpaceDotCommaHyphenApostrophe) {
          this.errors.push('Note consist of alphas, digits, slash, comma, dot, number, hyphen');
        }

        if (!this.errors.length && !this.error.length) {
          this.update();
          return true;
        }

        e.preventDefault();
      },

      update() {
        let dataPost = this.dataPost();
        updateRequester(dataPost, this.$route.params.id)
          .then(() => this.requesterCreatingSuccessful())
          .catch((request) => this.requesterCreatingFailed(request));
      },

      requesterCreatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('Requester is updated.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.$router.replace(this.$route.query.redirect || '/admin/requesters')
      },

      requesterCreatingFailed(req) {
        this.errors = false;
        this.error = 'Requester updating failed! ' + req;
        console.log(req);
      },
      dataPost() {
        return {
          first_name: this.firstName,
          last_name: this.lastName,
          prefix: this.prefix,
          suffix: this.suffix,
          organization_id: this.organizationId,
          email_work: this.emailWork,
          email_personal: this.emailPersonal,
          line_1: this.addressLine1,
          line_2: this.addressLine2,
          city: this.city,
          state: this.addressState,
          zip: this.zip,
          phone_home: this.phoneHome,
          phone_work: this.phoneWork,
          phone_extension: this.phoneExtension,
          phone_fax: this.fax,
          phone_mob1: this.phoneMob1,
          phone_mob2: this.phoneMob2,
          website: this.website,
          other_source: this.otherSource,
          note: this.note,
          created_by_id: this.createdById,
          updated_by_id: store.state.user.id
        };
      },

      downloadData() {
        getOrganizations()
          .then(response => {
            this.organizationOptions = this.formatOrganizations(response.data.data);
          })
          .catch(error => console.log(error));

        getRequesterById(this.$route.params.id)
          .then(response => {
            const requester = response.data.data;
            this.firstName = requester.first_name;
            this.lastName = requester.last_name;
            this.prefix = requester.prefix;
            this.suffix = requester.suffix;
            this.phoneMob1 = requester.phone_mob1;
            this.phoneMob2 = requester.phone_mob2;
            this.phoneHome = requester.phone_home;
            this.phoneWork = requester.phone_work;
            this.phoneExtension = requester.phone_extension;
            this.fax = requester.phone_fax;
            this.organizationId = requester.organization_id;
            this.emailWork = requester.email_work;
            this.emailPersonal = requester.email_personal;
            this.addressLine1 = requester.line_1;
            this.addressLine2 = requester.line_2;
            this.city = requester.city;
            this.addressState = requester.state;
            this.zip = requester.zip;
            this.website = requester.website;
            this.otherSource = requester.other_source;
            this.note = requester.note;
            this.createdById = requester.created_by_id;
            this.updatedById = requester.updated_by_id;
            this.message = response.data.message;
            this.success = response.data.success;
            store.commit('setRequester', requester);
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
      }
    },
    mounted() {
      this.downloadData();
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

  .mr-10 {
    margin-right: 10px
  }

  .list-group-item {
    padding: 0.375rem 0.75rem
  }

  .green {
    background-color: #4dbd74;
    color: #fff;
    cursor: pointer;
  }

  .grey {
    background-color: #dfdfdf;
    cursor: pointer;
  }

  section.border {
    border: 2px solid #b6e4f4;
    padding: 10px;
  }
</style>
