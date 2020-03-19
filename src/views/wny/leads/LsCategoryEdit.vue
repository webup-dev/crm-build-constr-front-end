<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Edit Lead Source Category</strong>
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
  import {validations} from '../../../components/validations/leadSource';
  import {updateLsCategories, getLsCategoryById} from "../../../api/lsCategories";

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

        if (!this.$v.name.alphaSpace) {
          this.errors.push('Name consists of letters and space only.');
        }

        if (!this.$v.lsDescription.alphaNumSpaceDotCommaHyphen) {
          this.errors.push('Description consists of letters, numbers, space, dot, comma, hyphen only.');
        }

        if (!this.errors.length && !this.error.length) {
          this.update();
          return true;
        }

        e.preventDefault();
      },
      update() {
        let dataPost = {
          name: this.name,
          description: this.lsDescription
        };
        updateLsCategories(dataPost, this.$route.params.id)
          .then(() => this.lsCategoryUpdateSuccessful())
          .catch((request) => this.lsCategoryUpdateFailed(request));
      },

      lsCategoryUpdateSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('Lead Source Category is updated.', 'success');

        this.$router.replace(this.$route.query.redirect || '/admin/lead-source-categories')
      },

      lsCategoryUpdateFailed(req) {
        this.errors = false;
        this.error = 'Lead Source Category Updating is failed! ' + req;
        console.log(req);
      },

      download() {
        getLsCategoryById(this.$route.params.id)
          .then(response => (
            this.name = response.data.data.name,
              this.lsDescription = response.data.data.description
          ));
      }
    },
    mounted() {
      this.download();
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
