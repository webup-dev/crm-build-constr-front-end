<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Update Lead Status</strong>
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
              <b-button type="submit"
                        v-on:click="checkForm('save', $event)"
                        size="sm"
                        variant="primary"
                        style="margin-right: 10px">
                <i class="fa fa-dot-circle-o"></i>
                Save
              </b-button>
              <b-button class="btn btn-info"
                        size="sm"
                        v-on:click="closeForm"
                        style="margin-right: 10px">
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
  import {getLeadStatusById, getOrganizations, getLeadStatuses, updateLeadStatus} from "../../../api/leadStatuses";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: 'LeadStatusUpdate',
    data() {
      return {
        name: '',
        organizationOptions: [],
        organizationId: '',
        parentOptions: [],
        parentId: '',
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
        this.lsStatus = '';
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
            this.update(this.$route.params.id);
            return true;
          }
        }

        e.preventDefault();
      },
      update(id) {
        let dataPost = {
          name: this.name,
          organization_id: this.organizationId,
          parent_id: this.parentId === '' ? null : this.parentId
        };
        updateLeadStatus(dataPost, id)
          .then(() => this.leadStatusUpdatingSuccessful())
          .catch((request) => this.leadStatusUpdatingFailed(request));
      },

      leadStatusUpdatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Lead Status is updated.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.$router.replace(this.$route.query.redirect || '/admin/lead-statuses')
      },

      leadStatusUpdatingFailed(req) {
        this.errors = false;
        this.error = 'Lead Status Updating failed! ' + req;
        console.log(req);
      },
      downloadData() {
        getOrganizations()
          .then(response => {
            this.organizationOptions = this.formatOrganizations(response.data.data);
            this.message = this.response.data.message;
            this.success = response.data.success;
          })
          .catch(error => console.log(error));

        getLeadStatusById(this.$route.params.id)
          .then(response => {
            this.name = response.data.data.name;
            this.organizationId = response.data.data.organization_id;
            this.parentId = response.data.data.parent_id;
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
</style>
