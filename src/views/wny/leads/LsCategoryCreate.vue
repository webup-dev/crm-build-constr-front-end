<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <flash-message></flash-message>
          <div slot="header">
            <strong>Create Lead Source Category</strong>
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
              label="Name"
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

            <b-form-group
              label="Description"
              label-for="description"
              :label-cols="3"
              style="font-weight: bold"
            >
              <b-form-input
                id="description"
                v-model="$v.lsDescription.$model"
                type="text"
                :class="status($v.lsDescription)">

              </b-form-input>
            </b-form-group>

            <div slot="footer">
              <b-button type="submit"
                        class="mr-10"
                        size="sm"
                        variant="primary"
                        style="margin-right: 10px">
                <i class="fa fa-dot-circle-o"></i>
                Save
              </b-button>
              <b-button class="btn btn-success mr-10"
                        size="sm"
                        v-on:click="saveAndNew">
                Save & New
              </b-button>
              <b-button class="btn btn-info mr-10"
                        size="sm"
                        v-on:click="closeForm"
                        style="margin-right: 10px">
                Close form
              </b-button>
              <b-button class="btn btn-danger mr-10"
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
  import {validations} from '../../../components/validations/leadSource';
  import {addLsCategories} from "../../../api/lsCategories";
  import {addLeadSources} from "../../../api/leadSources";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: 'LsCategoryCreate',
    data() {
      return {
        name: '',
        lsDescription: '',
        errors: [],
        error: false
      }
    },
    validations: validations,
    methods: {
      cancel() {
        this.lsDescription = '';
        this.name = '';
        this.$nextTick(() => { this.$v.$reset() })
      },
      closeForm() {
        this.cancel();
        this.$router.replace(this.$route.query.redirect || '/admin/lead-source-categories')
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

        if (!this.$v.lsDescription.alphaNumSpaceDotCommaHyphenApostrophe) {
          this.errors.push('Description consists of letters, numbers, dot, comma, hyphen, apostrophe and space only.');
        }

        if (!this.errors.length && !this.error.length) {
          this.create();
          return true;
        }

        e.preventDefault();
      },
      create() {
        let dataPost = {
          name: this.name,
          description: this.lsDescription
        };
        addLsCategories(dataPost)
          .then(() => this.lsCategoryCreatingSuccessful())
          .catch((request) => this.lsCategoryCreatingFailed(request));
      },

      lsCategoryCreatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('New Lead Source Category is created.', 'success', {timeout: 10000});

        this.$router.replace(this.$route.query.redirect || '/admin/lead-source-categories')
      },

      lsCategoryCreatingFailed(req) {
        this.errors = false;
        this.error = 'Lead Source Category Creating failed! ' + req;
        console.log(req);
      },
      saveAndNew() {
        let dataPost = {
          name: this.name,
          description: this.lsDescription,
        };
        addLsCategories(dataPost)
          .then(() => this.lsCategoryStoringSuccessful())
          .catch((request) => this.lsCategoryCreatingFailed(request));
      },
      lsCategoryStoringSuccessful() {
        this.flash('New Lead Source Category is created.', 'success', {timeout: 10000});
        this.cancel();
        this.$router.replace(this.$route.query.redirect || '/admin/lead-source-categories/create')
      }
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
