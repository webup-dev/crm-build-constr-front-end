<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Soft-Deleted Lead Sources

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <a class="icon-action-undo action-icon" v-on:click="restoreLeadSource(props.row.id)"
               style="cursor: pointer"></a>
            <a class="icon-trash" v-on:click="permanentDeleteLeadSource(props.row.id)" style="cursor: pointer"></a>
          </p>
        </v-client-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import axios from "../../../backend/vue-axios/axios";
  import {getLeadSourceSoftDeleted, restoreLeadSource, deleteLeadSourcePermanently} from "../../../api/leadSources";

  const API_URL = process.env.VUE_APP_API_URL;

  Vue.use(ClientTable);

  export default {
    name: 'LeadSourcesSoftDeleted',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: ['id', 'name', 'category_id', 'ls_category.name', 'organization_id', 'organization.name', 'status', 'deleted_at', 'created_at', 'updated_at', 'actions'],
        data: [],
        message: '',
        success: false,
        options: {
          headings: {
            id: 'ID',
            name: 'Name',
            category_id: 'Category ID',
            'ls_category.name': 'Category Name',
            organization_id: 'Organization ID',
            'organizatiob.name': 'Organization Name',
            status: 'Status',
            deleted_at: 'Deleted',
            created_at: 'Created',
            updated_at: 'Updated',
            actions: 'Actions'
          },
          sortable: ['id', 'name', 'category_id', 'ls_category.name', 'organization_id', 'organization.name', 'status', 'deleted_at', 'created_at', 'updated_at', 'actions'],
          filterable: ['id', 'name', 'category_id', 'ls_category.name', 'organization_id', 'organization.name', 'status', 'deleted_at', 'created_at', 'updated_at', 'actions'],
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
      permanentDeleteLeadSource: function (id) {
        deleteLeadSourcePermanently(id)
             .then(() => this.leadSourceDeletingSuccessful())
             .catch((request) => this.leadSourceDeletingFailed(request));
      },
      leadSourceDeletingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Lead Source is deleted permanently.', 'success');

        this.downloadData();
      },
      leadSourceDeletingFailed(req) {
        this.errors = false;
        this.error = 'Lead Source deleting permanently failed! ' + req;
      },

      restoreLeadSource: function (id) {
        restoreLeadSource(id)
            .then(() => this.leadSourceRestoringSuccessful())
            .catch((request) => this.leadSourceRestoringFailed(request));

      },
      leadSourceRestoringSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Lead Source is restored.', 'success');

        this.downloadData();
      },
      leadSourceRestoringFailed(req) {
        this.errors = false;
        this.error = 'Lead Source Restoring failed! ' + req;
        console.log(req);
      },

      downloadData() {
        getLeadSourceSoftDeleted()
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
