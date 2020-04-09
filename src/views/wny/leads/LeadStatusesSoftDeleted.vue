<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Soft-Deleted Lead Statuses

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <a class="icon-action-undo action-icon" v-on:click="restoreLeadStatus(props.row.id)"
               style="cursor: pointer"></a>
            <a class="icon-trash" v-on:click="permanentDeleteLeadStatus(props.row.id)" style="cursor: pointer"></a>
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
  import {
    getLeadStatusesSoftDeleted,
    restoreLeadStatus,
    deleteLeadStatusPermanently,
    getLeadStatuses
  } from "../../../api/leadStatuses";

  const API_URL = process.env.VUE_APP_API_URL;
  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  Vue.use(ClientTable);

  export default {
    name: 'LeadStatusesSoftDeleted',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: [
          'id',
          'name',
          'organization_id',
          'organization.name',
          'parent_id',
          'lead_status_of_parent.name',
          'deleted_at',
          'created_at',
          'updated_at',
          'actions'],
        data: [],
        message: '',
        success: false,
        options: {
          headings: {
            id: 'ID',
            name: 'Name',
            organization_id: 'Organization ID',
            'organization.name': 'Organization Name',
            parent_id: 'Parent ID',
            'lead_status_of_parent.name': 'Parent Name',
            deleted_at: 'Deleted',
            created_at: 'Created',
            updated_at: 'Updated',
            actions: 'Actions'
          },
          sortable: ['id',
            'name',
            'organization_id',
            'organization.name',
            'parent_id',
            'lead_status_of_parent.name',
            'deleted_at',
            'created_at',
            'updated_at',
            'actions'],
          filterable: ['id',
            'name',
            'organization_id',
            'organization.name',
            'parent_id',
            'lead_status_of_parent.name',
            'deleted_at',
            'created_at',
            'updated_at',
            'actions'],
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
      permanentDeleteLeadStatus: function (id) {
        deleteLeadStatusPermanently(id)
          .then(() => this.leadStatusDeletingSuccessful())
          .catch((request) => this.leadStatusDeletingFailed(request));
      },
      leadStatusDeletingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Lead Status is deleted permanently.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.downloadData();
      },
      leadStatusDeletingFailed(req) {
        this.errors = false;
        this.error = 'Lead Status deleting permanently failed! ' + req;
      },

      restoreLeadStatus: function (id) {
        restoreLeadStatus(id)
          .then(() => this.leadStatusRestoringSuccessful())
          .catch((request) => this.leadStatusRestoringFailed(request));

      },
      leadStatusRestoringSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Lead Status is restored.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.downloadData();
      },
      leadStatusRestoringFailed(req) {
        this.errors = false;
        this.error = 'Lead Status Restoring failed! ' + req;
        console.log(req);
      },

      downloadData() {
        getLeadStatusesSoftDeleted()
          .then(response => {
            if (response.status === 204) {
              this.data = [];
            } else {
              this.data = response.data.data;
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
