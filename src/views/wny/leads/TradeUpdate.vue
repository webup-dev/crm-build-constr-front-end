<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Update Lead Source</strong>
          </div>
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

            <b-form-group label="Category *"
                          label-for="lsCategoryId"
                          :label-cols="3"
                          class="label-bold"
            >
              <b-form-select id="lsCategoryId"
                             v-model="$v.lsCategoryId.$model"
                             :plain="true"
                             :options=lsCategoryOptions
                             :class="status($v.lsCategoryId)">
              </b-form-select>
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

            <b-form-group label="Status *"
                          label-for="lsStatus"
                          :label-cols="3"
                          class="label-bold"
            >
              <b-form-select id="lsStatus"
                             v-model="$v.lsStatus.$model"
                             :plain="true"
                             :options=lsStatusOptions
                             :class="status($v.lsStatus)">
              </b-form-select>
            </b-form-group>

            <div slot="footer">
              <b-button type="submit"
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
  import {validations} from '../../../components/validations/leadSources';
  import {getLeadSourceById, getOrganizations, getCategories, updateLeadSource} from "../../../api/leadSources";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: 'LeadSourceUpdate',
    data() {
      return {
        name: '',
        lsCategoryOptions: '',
        lsCategoryId: '',
        organizationOptions: '',
        organizationId: '',
        lsStatusOptions: [{value: 'active', text: 'active'}, {value: 'inactive', text: 'inactive'}],
        lsStatus: '',
        errors: [],
        error: false
      }
    },
    validations: validations,
    methods: {
      cancel() {
        this.name = '';
        this.lsCategoryId = '';
        this.organizationId = '';
        this.lsStatus = '';
      },
      closeForm() {
        this.cancel();
        this.$router.replace(this.$route.query.redirect || '/admin/lead-sources')
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

        if (!this.$v.name.required) {
          this.errors.push('Name is required.');
        }

        if (!this.$v.name.alphaNumSpaceDotCommaHyphenApostrophe) {
          this.errors.push('Name consists of letters, numbers, dot, comma, hyphen, apostrophe and space only.');
        }

        if (!this.$v.lsCategoryId.required) {
          this.errors.push('Category is required.');
        }

        if (!this.$v.lsCategoryId.integer) {
          this.errors.push('Wrong set of categories.');
        }

        if (!this.$v.organizationId.required) {
          this.errors.push('Organization is required.');
        }

        if (!this.$v.organizationId.integer) {
          this.errors.push('Wrong set of organizations.');
        }

        if (!this.$v.lsStatus.required) {
          this.errors.push('Status is required.');
        }

        if (!this.$v.lsStatus.alpha) {
          this.errors.push('Wrong set of statuses.');
        }

        if (!this.errors.length && !this.error.length) {
          this.update(this.$route.params.id);
          return true;
        }

        e.preventDefault();
      },
      update(id) {
        let dataPost = {
          name: this.name,
          category_id: this.lsCategoryId,
          organization_id: this.organizationId,
          status: this.lsStatus
        };
        updateLeadSource(dataPost, id)
          .then(() => this.leadSourceUpdatingSuccessful())
          .catch((request) => this.leadSourceUpdatingFailed(request));
      },

      leadSourceUpdatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Lead Source is updated.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.$router.replace(this.$route.query.redirect || '/admin/lead-sources')
      },

      leadSourceUpdatingFailed(req) {
        this.errors = false;
        this.error = 'Lead Source Updating failed! ' + req;
        console.log(req);
      },
      downloadData() {
        getCategories()
          .then(response => {
            this.lsCategoryOptions = this.formatCategories(response.data.data);
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch(error => console.log(error));

        getOrganizations()
          .then(response => {
            this.organizationOptions = this.formatCategories(response.data.data);
            this.message = this.formatOrganizations(response.data.message);
            this.success = response.data.success;
          })
          .catch(error => console.log(error));

        getLeadSourceById(this.$route.params.id)
          .then(response => {
            this.lsCategoryId = response.data.data.category_id;
            this.organizationId = response.data.data.organization_id;
            this.name = response.data.data.name;
            this.lsStatus = response.data.data.status;
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch(error => console.log(error));
      },
      formatCategories(lsCategories) {
        let newArr = [];
        lsCategories.forEach(function (obj, index) {
          newArr.push({
            value: obj.id,
            text: obj.name
          });
        });
        newArr.sort((a,b) => {return (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0);} );
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
