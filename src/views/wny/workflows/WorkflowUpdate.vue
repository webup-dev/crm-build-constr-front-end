<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Update Stages</strong>
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

            <b-form-group label="Workflow Type *"
                          label-for="workflowType"
                          :label-cols="3"
                          class="label-bold"
            >
              <b-form-select id="workflowType"
                             v-model="$v.workflowType.$model"
                             :plain="true"
                             :options=workflowTypeOptions
                             :class="status($v.workflowType)">
              </b-form-select>
            </b-form-group>

            <b-form-group
              label="Description"
              label-for="description"
              :label-cols="3"
              style="font-weight: bold"
            >
              <b-form-input
                id="description"
                v-model="$v.description.$model"
                type="text"
                placeholder="Description"
                :class="status($v.description)">

              </b-form-input>
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
  import {validations} from '../../../components/validations/stages';
  import {getStageById, getOrganizations, updateStage} from "../../../api/stages";
  import WORKFLOW_TYPES from '../../../constants/workflows';

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: 'StageUpdate',
    data() {
      return {
        name: '',
        organizationOptions: [],
        organizationId: '',
        workflowTypeOptions: WORKFLOW_TYPES,
        workflowType: '',
        description: '',
        errors: [],
        error: false
      }
    },
    validations: validations,
    methods: {
      cancel() {
        this.name = '';
        this.organizationId = '';
        this.workflowType = '';
        this.description = '';
        this.$nextTick(() => {
          this.$v.$reset()
        })
      },
      closeForm() {
        this.cancel();
        this.$router.replace(this.$route.query.redirect || '/admin/stages')
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

        if (!this.$v.workflowType.alpha) {
          this.errors.push('Wrong set of Workflow Types.');
        }

        if (!this.$v.description.alphaNumSpaceDotCommaHyphenApostrophe) {
          this.errors.push('Description consists of letters, numbers, dot, comma, hyphen, apostrophe and space only.');
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
          workflow_type: this.workflowType,
          description: this.description,
        };
        updateStage(dataPost, id)
          .then(() => this.stageUpdatingSuccessful())
          .catch((request) => this.stageUpdatingFailed(request));
      },

      stageUpdatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Stage is updated.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.$router.replace(this.$route.query.redirect || '/admin/stages')
      },

      stageUpdatingFailed(req) {
        this.errors = false;
        this.error = 'Stage Updating failed! ' + req;
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

        getStageById(this.$route.params.id)
          .then(response => {
            this.name = response.data.data.name;
            this.organizationId = response.data.data.organization_id;
            this.workflowType = response.data.data.workflow_type;
            this.description = response.data.data.description;
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
</style>
