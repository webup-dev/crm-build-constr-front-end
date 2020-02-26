<template>
  <div>
    <b-card-header>
      <i class="icon-menu mr-1"></i> Edit File

      <div class="card-header-actions"></div>
    </b-card-header>
    <b-form
      id="formEditFile"
      @submit.prevent=checkForm
      novalidate=novalidate
    >
      <b-row>
        <b-col>
          <b-row>
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
          </b-row>
          <b-row>
            <b-col class="md-6">
              <input id="id_edit" v-model=$v.fileInput.id.$model
                     :class="status($v.fileInput.id)" type="hidden"/>

              <b-form-group
                label="Owner Object Type *"
                label-for="owner_object_type_edit"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  plaintext
                  id="owner_object_type_edit"
                  v-model=$v.owner.owner_object_type.$model
                  type="text">

                </b-form-input>
              </b-form-group>

              <input id="owner_object_id_edit" v-model=$v.owner.owner_object_id.$model type="hidden"/>

              <b-form-group
                label="Owner Name *"
                label-for="owner_name_edit"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  plaintext
                  id="owner_name_edit"
                  v-model="customer.name"
                  type="text">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Description"
                label-for="description_edit"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  id="description_edit"
                  v-model="$v.fileInput.description.$model"
                  type="text"
                  :class="status($v.fileInput.description)">

                </b-form-input>
              </b-form-group>

              <input id="owner_user_id_edit" v-model=$v.owner.owner_user_id.$model
                     :class="status($v.owner.owner_user_id)" type="hidden"/>

              <b-form-group
                label="Creator *"
                label-for="owner_user_name_edit"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  plaintext
                  id="owner_user_name_edit"
                  v-model="userName"
                  type="text">

                </b-form-input>
              </b-form-group>

              <b-form-group
                label="Filename"
                label-for="filename"
                :label-cols="3"
                class="label bold"
              >
                <b-form-input
                  plaintext
                  id="filename"
                  v-model="fileInput.filename"
                  type="text">

                </b-form-input>
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
  import {validations} from '../components/validations/updateFile';
  import store from "../store";
  import {addFile} from "../api/addFile";
  import {updateFile} from "../api/file";

  export default {
    name: "FileEdit",
    props: ['owner', 'customer', 'fileInput'],
    data: function () {
      return {
        error: '',
        errors: [],
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
        console.log("customer: ");
        console.log(this.customer);
      },
      closeForm() {
        this.cancel();
        this.$emit('update-file-block', false);
      },
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      checkForm: function (e) {
        // console.log('owner.owner_object_type: ' + this.owner.owner_object_type);
        // validation
        this.errors = [];

        // id
        if (!this.$v.fileInput.id.required) {
          this.errors.push('File ID is required.');
        }

        if (!this.$v.fileInput.id.integer) {
          this.errors.push('File ID must be integer.');
        }

        // description
        if (!this.$v.fileInput.description.alphaSpaceDotHyphen) {
          this.errors.push('Description must consist of letters, spaces. dots, hyphens only.');
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

        if (!this.errors.length && !this.error.length) {
          this.update();
          return true;
        }

        e.preventDefault();
      },
      update() {
        let data = {};
        data.owner_user_id = this.owner.owner_user_id;
        data.owner_object_type = this.owner_object_type;
        data.owner_object_id = this.owner_object_id;
        data.description = this.fileInput.description;

        updateFile(this.fileInput.id, data)
          .then(request => this.updateSuccess(request))
          .catch((request) => this.updateFail(request));
      },
      updateSuccess(req) {
        this.errors = false;
        this.error = false;
        this.flash('File is updated.', 'success');
        this.clear();
        this.fileInput.description = '';
        this.$emit('file-is-updated', true);
      },

      updateFail(req) {
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
