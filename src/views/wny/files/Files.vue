<template>
  <div class="animated fadeIn">
    <b-card>
      <flash-message></flash-message>
      <b-card-header>
        <i class="icon-menu mr-1"></i>Customer Files

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <div class="row">
          <!-- Customer info -->
          <div class="col-md-3 info-block" style="padding: 10px; border: 1px solid #c8ced3">
            <a @click="newFile" class="btn btn-warning btn-block" style="margin-bottom: 20px;">Create New File</a>
            <customer-info :customer="customer"/>
          </div>

          <!-- Right column -->
          <div class="col-md-9" style="padding: 10px; border: 1px solid #c8ced3; border-left: 0; ">
            <!-- Create new file-->
            <div id="newFile" :style="{ 'display': displayCreateForm}">
              <new-file v-on:add-file-block="closeNewFileForm" v-on:file-is-added="fileIsAdded" :owner="owner"
                        :customer="customer"></new-file>
              <hr>
            </div>
            <!-- Edit file-->
            <div id="editFile" :style="{ 'display': displayEditForm}">
              <file-edit v-on:update-file-block="closeUpdateFileForm" v-on:file-is-updated="fileIsUpdated"
                         :owner="owner" :customer="customer" :fileInput="fileInput"></file-edit>
              <hr>
            </div>
            <!--Table with files-->
            <v-client-table :columns="columns" :data="data" :options="options" id="dataTable">
              <p slot="actions" slot-scope="props">
                <a class="icon-pencil action-in-table" v-on:click="editFile(props.row.id)"></a>
                <a class="icon-cloud-download action-in-table"
                   v-on:click="downloadWithAxios(props.row.id, props.row.filename)"/>
                <a class="icon-trash action-in-table" v-on:click="deleteFile(props.row.id)"></a>
              </p>
            </v-client-table>

          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from "vue";
  import {ClientTable, Event} from 'vue-tables-2';
  import CustomerInfo from "../../../components/CustomerInfo";
  import {getCustomerInfo} from "../../../api/customerPage";
  import {getCustomerFiles} from "../../../api/customerFiles";
  import {softDestroyFile} from "../../../api/destroyFile";
  import {getFile} from "../../../api/file";
  import axios from "../../../backend/vue-axios/axios";
  import mixin from "../../../mixins/mixin";
  import NewFile from "../../../components/NewFile";
  import FileEdit from "../../../components/FileEdit";
  import store from "../../../store";

  const API_URL = process.env.VUE_APP_API_URL;

  Vue.use(ClientTable);

  export default {
    name: "Files",
    mixins: [mixin],
    components: {
      ClientTable,
      Event,
      CustomerInfo,
      NewFile,
      FileEdit
    },
    data() {
      return {
        columns: ['id', 'owner_user_id', 'user.name', 'description', 'filename', 'created_at', 'updated_at', 'actions'],
        data: [],
        options: {
          headings: {
            id: 'ID',
            owner_user_id: 'Owner ID',
            'user.name': 'Owner',
            description: 'Description',
            filename: 'Filename',
            created_at: 'Created',
            updated_at: 'Updated',
            actions: 'Actions'
          },
          sortable: ['description', 'filename', 'created_at', 'updated_at'],
          filterable: ['description', 'filename', 'created_at', 'updated_at'],
          sortIcon: {base: 'fa', up: 'fa-sort-asc', down: 'fa-sort-desc', is: 'fa-sort'},
          pagination: {
            chunk: 5,
            edge: false,
            nav: 'scroll'
          }
        },
        customer: {
          name: "",
          organization: "",
          type: "",
          city: "",
          line_1: "",
          line_2: "",
          state: "",
          zip: '',
          customer_owner_user: ""
        },
        displayCreateForm: "none;",
        displayEditForm: "none",
        errors: [],
        error: '',
        owner: {
          owner_object_type: 'customer',
          owner_object_id: this.$route.params.id,
          owner_user_id: store.state.user.id
        },
        fileInput: {
          description: ''
        }
      }
    },
    methods: {
      forceFileDownload(response, filename) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      },

      downloadWithVueResource() {
        this.$http({
              method: 'get',
              url: this.url,
              responseType: 'arraybuffer'
            })
            .then(response => {
              this.forceFileDownload(response)
            })
            .catch(() => console.log('error occurred'))
      },

      downloadWithAxios(id, filename) {
        axios({
          method: 'get',
          url: API_URL + '/file/' + id,
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        })
          .then(response => {
            this.forceFileDownload(response, filename)
          })
          .catch(() => console.log('error occurred'))
      },

      fileIsAdded() {
        this.closeNewFileForm();
        this.downloadData();
      },
      fileIsUpdated() {
        this.closeUpdateFileForm();
        this.downloadData();
      },
      newFile() {
        this.displayCreateForm = 'block';
        this.closeUpdateFileForm();
      },
      closeNewFileForm() {
        this.displayCreateForm = 'none';
      },
      closeUpdateFileForm() {
        this.displayEditForm = 'none';
      },
      editFile: function (fileId) {
        this.displayEditForm = 'block';
        getFile(fileId)
          .then(response => {
            this.fileInput = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch((request) => this.getFileFailed(request));
        this.closeNewFileForm();
      },
      getFileFailed(req) {
        this.errors = false;
        this.error = 'File Information Getting failed! ' + req;
        console.log(req);
        this.flash(req.response.data.message + " Status code: " + req.response.data.code, 'error');
      },
      deleteFile: function (fileId) {
        softDestroyFile(fileId)
          .then(() => this.fileDeletingSuccessful())
          .catch((request) => this.fileDeletingFailed(request));
      },
      fileDeletingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The File is deleted.', 'success');

        this.downloadData();
      },
      fileDeletingFailed(req) {
        this.errors = false;
        this.error = 'File Deleting failed! ' + req;
        console.log(req);
        this.flash(req.response.data.message + " Status code: " + req.response.data.code, 'error');
      },

      downloadData() {
        getCustomerInfo(this.$route.params.id)
          .then(response => {
            this.customer = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch(error => console.log(error));

        getCustomerFiles(this.$route.params.id)
          .then(response => {
            this.data = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch((error) => this.getFail(error));
      },
      getFail(error) {
        if (error.response) {
          console.log(error.response);
          this.logout();
        }
      }
    },
    created() {
      this.displayCreateForm = 'none';
      this.displayEditForm = 'none';
    },
    mounted() {
      this.downloadData();
    }
  }
</script>

<style scoped lang="scss">
  #newFile, #editFile {
    width: 95%;
    margin: 0 auto;
  }

  .action-in-table {
    cursor: pointer;
    margin-right: 5px
  }

  #dataTable {
    width: 95%;
    margin: 0 auto;

    .VuePagination {
      text-align: center;
      justify-content: center;
    }

    .vue-title {
      text-align: center;
      margin-bottom: 10px;
    }

    .VueTables__search-field {
      display: flex;
    }

    .action-icon {
      margin-right: 10px;
    }

    .VueTables__search-field input {
      margin-left: 0.25rem;
    }

    .VueTables__limit-field {
      display: flex;
    }

    .VueTables__limit-field select {
      margin-left: 0.25rem !important;
    }

    .VueTables__table th {
      text-align: center;
    }

    .VueTables__child-row-toggler {
      width: 16px;
      height: 16px;
      line-height: 16px;
      display: block;
      margin: auto;
      text-align: center;
    }

    .VueTables__child-row-toggler--closed::before {
      content: "+";
    }

    .VueTables__child-row-toggler--open::before {
      content: "-";
    }
  }

</style>
