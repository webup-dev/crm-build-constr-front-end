<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Soft-Deleted Files
        <!--        <a href="#" class="badge badge-danger">Module Customers</a>-->

        <div class="card-header-actions">
          <!--          <a-->
          <!--            href="https://github.com/vadis2/helper/blob/master/vuejs/admin-template/coreUI/components/05-table-final.md"-->
          <!--            rel="noopener noreferrer" target="_blank"-->
          <!--            className="card-header-action" class="btn btn-ghost-default">-->
          <!--            <small className="text-muted">docs</small>-->
          <!--          </a>-->
        </div>
      </b-card-header>
      <b-card-body>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <a class="icon-action-undo action-icon" v-on:click="restoreFile(props.row.id)"
               style="cursor: pointer"></a>
            <a class="icon-trash" v-on:click="permanentDeleteCustomer(props.row.id)" style="cursor: pointer"></a>
          </p>

          <!--          <div slot="child_row" slot-scope="props">-->
          <!--            The link to {{props.row.name}} is <a :href="props.row.uri">{{props.row.uri}}</a>-->
          <!--          </div>-->
        </v-client-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import moment from "moment";
  import axios from "../../../backend/vue-axios/axios";
  import {softDeleted, restoreFile} from "../../../api/file";

  const API_URL = process.env.VUE_APP_API_URL;
  Vue.use(ClientTable)
  // Vue.use(BCard)

  export default {
    name: 'CustomersSoftDeleted',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: ['id', 'owner_user_id', 'description', 'filename', 'created_at', 'updated_at', 'actions'],
        data: [],
        message: '',
        success: false,
        options: {
          headings: {
            id: 'ID',
            owner_user_id: 'Owner ID',
            // 'user.name': 'Owner',
            description: 'Description',
            filename: 'Filename',
            deleted_at: 'Deleted',
            created_at: 'Created',
            updated_at: 'Updated',
            actions: 'Actions'
          },
          sortable: ['id', 'owner_user_id', 'description', 'filename', 'created_at', 'updated_at', 'actions'],
          filterable: ['id', 'owner_user_id', 'description', 'filename', 'created_at', 'updated_at', 'actions'],
          sortIcon: {base: 'fa', up: 'fa-sort-asc', down: 'fa-sort-desc', is: 'fa-sort'},
          pagination: {
            chunk: 5,
            edge: false,
            nav: 'scroll'
          }
        },
        useVuex: false,
        theme: 'bootstrap4',
        template: 'default'
      }
    },
    methods: {
      permanentDeleteCustomer: function (customerId) {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        axios.delete(API_URL + '/customers/' + customerId + '/permanently', headers)
             .then(request => this.customerDeletingSuccessful(request))
             .catch((request) => this.customerDeletingFailed(request));
      },
      customerDeletingSuccessful(req) {
        this.errors = false;
        this.error = false;
        this.flash('The Customer is deleted permanently.', 'success');

        this.downloadData();
      },
      customerDeletingFailed(req) {
        this.errors = false;
        this.error = 'Customer deleting permanently failed! ' + req;
      },

      restoreFile: function (fileId) {
        restoreFile(fileId)
            .then(request => this.fileRestoringSuccessful(request))
            .catch((request) => this.fileRestoringFailed(request));

      },
      fileRestoringSuccessful(req) {
        this.errors = false;
        this.error = false;
        this.flash('The File Data is restored.', 'success');

        this.downloadData();
        // this.$router.replace(this.$route.query.redirect || '/admin/user-profiles')
      },
      fileRestoringFailed(req) {
        this.errors = false;
        this.error = 'File Data Restoring failed! ' + req;
        console.log(req);
        this.flash(req.response.data.message + " Status code: " + req.response.data.code, 'error');
      },

      downloadData() {
        softDeleted()
             .then(response => {
               if (response.status === 204) {
                 this.data = [];
               } else {
                 this.data = response.data.data;
                 this.message = response.data.message;
                 this.success = response.data.success;
               }
             })
             .catch(error => console.log(error));
      }
    },
    mounted() {
      this.downloadData();
    }
  };
</script>

<style lang="scss">
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
