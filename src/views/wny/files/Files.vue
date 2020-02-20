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
          <!--        <div class="email-app">-->
          <div class="col-md-3 info-block" style="padding: 10px; border: 1px solid #c8ced3">
            <!--            <a @click="newFile" class="btn btn-warning btn-block">Create New File</a>-->
            <a @click="newFile" class="btn btn-warning btn-block" style="margin-bottom: 20px;">Create New File</a>
            <customer-info :customer="customer"/>
          </div>
          <div class="col-md-9" style="padding: 10px; border: 1px solid #c8ced3; border-left: 0; ">
            <div id="newFile" :style="{ 'display': display}">
              <new-file v-on:add-file-block="closeNewFileForm" v-on:file-is-added="fileIsAdded" :owner="owner" :customer="customer"></new-file>
              <hr>
            </div>
            <v-client-table :columns="columns" :data="data" :options="options" id="dataTable">
              <p slot="actions" slot-scope="props">
                <a :href="'#/admin/customers/' + props.row.id + '/show'" class="fa fa-user-o action-icon"></a>
                <a :href="'#/admin/customer-comments/' + props.row.id" class="fa fa-comment-o action-icon"></a>
                <a :href="'#/admin/customers/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>
                <a :href="'#/admin/customers/' + props.row.id + '/files'" class="fa fa-files-o action-icon"></a>
                <a class="icon-trash" v-on:click="deleteCustomer(props.row.id)" style="cursor: pointer"></a>
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
  import axios from "../../../backend/vue-axios/axios";
  import mixin from "../../../mixins/mixin";
  import NewFile from "../../../components/NewFile";
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
      NewFile
    },
    data() {
      return {
        columns: ['id', 'description', 'filename', 'created_at', 'updated_at', 'actions'],
        data: [],
        options: {
          headings: {
            id: 'ID',
            name: 'Account Name',
            type: 'Type',
            'organization.name': 'Organization',
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
        display: "none;",
        errors: [],
        error: '',
        owner: {
          owner_object_type: 'customer',
          owner_object_id: this.$route.params.id,
          owner_user_id: store.state.user.id
        },
        fileInput: {
          description: 'Description'
        }
      }
    },
    methods: {
      fileIsAdded() {
        this.closeNewFileForm();
        this.downloadData();
      },
      newFile() {
        this.display = 'block';
      },
      closeNewFileForm() {
        this.display = 'none';
      },
      deleteCustomer: function (customerId) {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        axios.delete(API_URL + '/customers/' + customerId, headers)
             .then(request => this.customerDeletingSuccessful(request))
             .catch((request) => this.customerDeletingFailed(request));
      },
      customerDeletingSuccessful(req) {
        this.errors = false;
        this.error = false;
        this.flash('The Customer is deleted.', 'success');

        this.downloadData();
      },
      customerDeletingFailed(req) {
        this.errors = false;
        this.error = 'Customer Deleting failed! ' + req;
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
      this.display = 'none';
    },
    mounted() {
      this.downloadData();
    }
  }
</script>

<style scoped lang="scss">
  #newFile {
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
