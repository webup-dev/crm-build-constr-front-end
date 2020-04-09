<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <flash-message></flash-message>
          <div slot="header">
            <strong>Create Lead Status</strong>
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
            <b-form-group
              label="Name *"
              label-for="name"
              :label-cols="3"
              style="font-weight: bold"
            >
              <b-form-input
                id="name"
                autofocus
                v-model="$v.name.$model"
                type="text"
                placeholder="Name"
                :class="status($v.name)">

              </b-form-input>
            </b-form-group>

            <b-form-group label="Organization *"
                          label-for="organizationId"
                          :label-cols="3"
                          class="label-bold"
            >
              <b-form-select id="organizationId"
                             v-model="$v.organizationId.$model"
                             :plain="true"
                             :options=organizationOptions
                             :class="status($v.organizationId)">
              </b-form-select>
            </b-form-group>

            <b-form-group label="Parent"
                          label-for="parentId"
                          :label-cols="3"
                          class="label-bold"
            >
              <b-form-select id="parentId"
                             v-model="$v.parentId.$model"
                             :plain="true"
                             :options=parentOptions
                             :class="status($v.parentId)">
              </b-form-select>
            </b-form-group>

            <div slot="footer">
              <b-button id="save"
                        v-on:click="checkForm('save', $event)"
                        class="mr-10"
                        size="sm"
                        variant="primary">
                <i class="fa fa-dot-circle-o"></i>
                Save
              </b-button>
              <b-button id="saveAndNew"
                        v-on:click="checkForm('saveAndNew', $event)"
                        class="btn btn-success mr-10"
                        size="sm">
                Save & New
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
  import {validations} from '../../../components/validations/leadStatuses';
  import {addLeadStatus, getOrganizations, getLeadStatuses} from "../../../api/leadStatuses";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: 'LeadStatusCreate',
    data() {
      return {
        name: '',
        parentOptions: [],
        parentId: '',
        organizationOptions: [{value: 0, text: 'org 1'}, {value: 1, text: 'org 2'}],
        organizationId: '',
        errors: [],
        error: false
      }
    },
    validations: validations,
    methods: {
      cancel() {
        this.name = '';
        this.organizationId = '';
        this.parentId = '';
        this.$nextTick(() => {
          this.$v.$reset()
        })
      },
      closeForm() {
        this.cancel();
        this.$router.replace(this.$route.query.redirect || '/admin/lead-statuses')
      },
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      checkForm: function (keyWord, e) {
        // validation
        this.errors = [];

        if (!this.$v.name.required) {
          this.errors.push('Name is required.');
        }

        if (!this.$v.name.alphaNumSpaceDotCommaHyphenApostrophe) {
          this.errors.push('Name consists of letters, numbers, dot, comma, hyphen, apostrophe and space only.');
        }

        if (!this.$v.organizationId.required) {
          this.errors.push('Organization is required.');
        }

        if (!this.$v.organizationId.integer) {

          this.errors.push('Wrong set of organizations.');
        }

        if (!this.$v.parentId.integer) {
          this.errors.push('Wrong set of parents.');
        }

        if (!this.errors.length && !this.error.length) {
          if (keyWord === 'save') {
            this.create();
            return true;
          }
        }

        if (!this.errors.length && !this.error.length) {
          if (keyWord === 'saveAndNew') {
            this.saveAndNew();
            return true;
          }
        }

        e.preventDefault();
      },
      create() {
        let dataPost = {
          name: this.name,
          organization_id: this.organizationId,
          parent_id: this.parentId === '' ? null : this.parentId
        };
        addLeadStatus(dataPost)
          .then(() => this.leadStatusCreatingSuccessful())
          .catch((request) => this.leadStatusCreatingFailed(request));
      },

      leadStatusCreatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('New Lead Status is created.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.$router.replace(this.$route.query.redirect || '/admin/lead-statuses')
      },

      leadStatusCreatingFailed(req) {
        this.errors = false;
        this.error = 'Lead Status Creating failed! ' + req;
        console.log(req);
      },
      saveAndNew() {
        let dataPost = {
          name: this.name,
          organization_id: this.organizationId,
          parent_id: this.parentId === '' ? null : this.parentId
        };
        addLeadStatus(dataPost)
          .then(() => this.leadStatusStoringSuccessful())
          .catch((request) => this.leadStatusCreatingFailed(request));
      },
      leadStatusStoringSuccessful() {
        this.flash('New Lead Status is created.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});
        this.cancel();
        this.downloadData();
      },

      downloadData() {
        getOrganizations()
          .then(response => {
            this.organizationOptions = this.formatOrganizations(response.data.data);
          })
          .catch(error => console.log(error));

        getLeadStatuses()
          .then(response => {
            this.parentOptions = this.formatParent(response.data.data);
          })
          .catch(error => console.log(error));
      },
      formatParent(leadStatuses) {
        let newArr = [];
        leadStatuses.forEach(function (obj, index) {
          if (obj.parent_id == null && obj.name == 'Declined') {
            newArr.push({
              value: obj.id,
              text: obj.name
            });
          }
        });
        return newArr;
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
</style>
