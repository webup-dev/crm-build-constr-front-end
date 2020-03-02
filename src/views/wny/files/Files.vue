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
              <new-file v-on:add-file-block="closeNewFileForm" v-on:file-is-added="fileIsAdded" :owner="owner" :customer="customer"></new-file>
              <hr>
            </div>
            <!-- Edit file-->
            <div id="editFile" :style="{ 'display': displayEditForm}">
              <file-edit v-on:update-file-block="closeUpdateFileForm" v-on:file-is-updated="fileIsUpdated" :owner="owner" :customer="customer" :fileInput="fileInput"></file-edit>
              <hr>
            </div>
            <v-client-table :columns="columns" :data="data" :options="options" id="dataTable">
              <p slot="actions" slot-scope="props">
                <a class="icon-pencil" v-on:click="editFile(props.row.id)" style="cursor: pointer"></a>
<!--                <a class="icon-cloud-download" href="http://wny2.com/storage/customer-1-2020-02-19_08-41-20-579.pdf" download="customer-1-2020-02-19_08-41-20-579.pdf"></a>-->
<!--                <button @click="downloadWithVueResource">Download file with Vue Resource</button>-->
<!--                <button @click="downloadWithAxios">Download file with Axios</button>-->
<!--                <a class="icon-cloud-download"-->
<!--                   :href="props.row.filename"-->
<!--                   @click.prevent="downloadItem(props.row.filename)" />-->
                <!--                <a :href="'#/admin/customers/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>-->
                <!--                <a :href="'#/admin/customers/' + props.row.id + '/files'" class="fa fa-files-o action-icon"></a>-->
                <a class="icon-trash" v-on:click="deleteFile(props.row.id)" style="cursor: pointer"></a>
              </p>

              <!--          <div slot="child_row" slot-scope="props">-->
              <!--            The link to {{props.row.name}} is <a :href="props.row.uri">{{props.row.uri}}</a>-->
              <!--          </div>-->
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
  import {getFile, updateFile} from "../../../api/file";
  import axios from "../../../backend/vue-axios/axios";
  import mixin from "../../../mixins/mixin";
  import NewFile from "../../../components/NewFile";
  import FileEdit from "../../../components/FileEdit";
  import store from "../../../store";
  const API_URL = process.env.VUE_APP_API_URL;
  const DOC_URL = 'http://wny2.com/storage';

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
        },
        url:'http://wny2.com/storage/customer_1_test-file-2.jpg'
      }
    },
    methods: {
      forceFileDownload(response){
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.png') //or any other extension
        document.body.appendChild(link)
        link.click()
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
            .catch(() => console.log('error occured'))

      },

      downloadWithAxios(){
        axios({
          method: 'get',
          url: this.url,
          responseType: 'arraybuffer'
        })
          .then(response => {

            this.forceFileDownload(response)

          })
          .catch(() => console.log('error occured'))
      },
      // forceFileDownload(response, filename){
      //   const url = window.URL.createObjectURL(new Blob([response.data]))
      //   const link = document.createElement('a')
      //   link.href = url
      //   link.setAttribute('download', filename) //or any other extension
      //   document.body.appendChild(link)
      //   link.click()
      // },
      //
      // downloadFile(filename) {
      //   this.$http({
      //         method: 'get',
      //         url: DOC_URL + '/' + filename,
      //         responseType: 'arraybuffer'
      //       })
      //       .then(response => {
      //         this.forceFileDownload(response, filename)
      //       })
      //       .catch(() => console.log('error occured'))
      //
      // },
      // downloadItem (filename) {
      //   const url = DOC_URL + '/' + filename;
      //   console.log('url')
      //   console.log(url)
      //   const label = filename;
      //   axios.get(url, { responseType: 'blob' })
      //        .then(response => {
      //          const blob = new Blob([response.data], { type: 'application/jpg' })
      //          const link = document.createElement('a')
      //
      //          link.href = URL.createObjectURL(blob)
      //          link.download = label
      //          link.click()
      //          URL.revokeObjectURL(link.href)
      //        })
      //        .catch(console.error);
      // },
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
             .then(request => this.fileDeletingSuccessful(request))
             .catch((request) => this.fileDeletingFailed(request));
      },
      fileDeletingSuccessful(req) {
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
            console.log('getCustomerFiles: ');
            console.log(response);
          })
          .catch((error) => this.getFail(error));
      },
      getFail(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
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
