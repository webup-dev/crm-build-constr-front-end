<template>
  <div>
    <b-card-header>
      <i class="icon-menu mr-1"></i> Create File

      <div class="card-header-actions"></div>
    </b-card-header>
    <b-form
      id="formNewFile"
      @submit.prevent=checkForm
      novalidate=novalidate
      enctype="multipart/form-data"
    >
      <b-row>
        <b-col>
          <b-row>
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
          </b-row>
          <b-row>
            <b-col class="md-6">
              <b-form-group
                label="Owner Object Type *"
                label-for="owner_object_type"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  plaintext
                  id="owner_object_type"
                  v-model=$v.owner.owner_object_type.$model
                  type="text">

                </b-form-input>
              </b-form-group>

              <input id="owner_object_id" v-model=$v.owner.owner_object_id.$model type="hidden"/>

              <b-form-group
                label="Owner Name *"
                label-for="owner_name"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  plaintext
                  id="owner_name"
                  v-model="customer.name"
                  type="text">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Description"
                label-for="description"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  id="description"
                  v-model="$v.fileInput.description.$model"
                  type="text"
                  :class="status($v.fileInput.description)">

                </b-form-input>
              </b-form-group>

              <input id="owner_user_id" v-model=$v.owner.owner_user_id.$model :class="status($v.owner.owner_user_id)" type="hidden"/>

              <b-form-group
                label="Creator *"
                label-for="owner_user_name"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  plaintext
                  id="owner_user_name"
                  v-model="userName"
                  type="text">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="File input"
                label-for="file"
                :label-cols="3"
                style="float: none"
                class="label bold"
              >
                <input type="file"
                       :class="status($v.file)"
                       id="file"
                       ref="file"
                       v-on:change="handleFileUpload()"
                       v-if="uploadReady"
                       style="display: block; margin-bottom: 25px;"/>
                <a class="btn btn-warning" @click="clear">Clear File</a>
              </b-form-group>
            </b-col>
          </b-row>

          <div slot="footer">
            <b-button type="submit"
                      variant="primary"
                      style="margin-right: 10px">
              Save User
            </b-button>
            <a class="btn btn-info"
                      v-on:click="closeForm"
                      style="margin-right: 10px">
              Close form
            </a>
            <a class="btn btn-danger"
               v-on:click="cancel">
              Cancel
            </a>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
  import {validations} from '../components/validations/addFile';
  import store from "../store";
  import {addFile} from "../api/addFile";

  export default {
    name: "NewFile",
    props: ['owner', 'customer'],
    data: function () {
      return {
        error: '',
        errors: [],
        fileInput: {
          description: '',
        },
        file: '',
        uploadReady: true,
        userName: store.state.user.name
      }
    },
    validations: validations,
    methods: {
      cancel() {
        this.clear();
        this.fileInput.description = '';
      },
      clear() {
        this.uploadReady = false;
        this.$nextTick(() => {
          this.uploadReady = true
        })
      },
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
      },
      closeForm() {
        this.cancel();
        this.$emit('add-file-block', false);
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

        // description
        if (!this.$v.fileInput.description.alphaNumSpaceDotCommaHyphen) {
          this.errors.push('Description must consist of letters, numbers, spaces, dots, commas, hyphens only.');
        }

        // owner_object_type
        if (!this.$v.owner.owner_object_type.required) {
          this.errors.push('Owner\'s Object Type is required.');
        }

        if (!this.$v.owner.owner_object_type.alphaSpace) {
          this.errors.push('Owner\'s Object Type must consist of letters and space only.');
        }

        if (!this.$v.owner.owner_object_id.required) {
          this.errors.push('Owner\'s Object ID is required.');
        }

        if (!this.$v.owner.owner_object_id.integer) {
          this.errors.push('Owner\'s Object Id must be integer.');
        }

        // owner_user_id
        if (!this.$v.owner.owner_user_id.required) {
          this.errors.push('Owner-User ID is required.');
        }

        if (!this.$v.owner.owner_user_id.integer) {
          this.errors.push('Owner-User ID must be integer.');
        }

        // file
        if (!this.$v.file.required) {
          this.errors.push('File is required.');
        }

        if (!this.errors.length && !this.error.length) {
          this.create();
          return true;
        }

        e.preventDefault();
      },
      create() {
        let formData = new FormData();
        formData.append('photo', this.file);
        formData.append('filename', this.file.name);
        formData.append('owner_user_id', this.owner.owner_user_id);
        formData.append('owner_object_type', this.owner.owner_object_type);
        formData.append('owner_object_id', this.owner.owner_object_id);
        formData.append('description', this.fileInput.description);
        addFile(formData)
            .then(() => this.createSuccess())
            .catch((request) => this.createFail(request));
      },
      createSuccess() {
        this.errors = false;
        this.error = false;
        this.flash('New File is created.', 'success');
        this.clear();
        this.fileInput.description = '';
        this.$emit('file-is-added', true);
      },

      createFail(req) {
        this.errors = false;
        this.error = 'New File creating failed! ' + req;
        console.log(req);
      }
    }
  }
</script>

<style scoped>
  .bold {
    font-weight: bold;
  }
</style>
