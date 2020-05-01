<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Leads

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <a href="/#/admin/lead/create" class="btn btn-warning" style="float: right">Create Lead</a>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <a :href="'#/admin/lead/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>
            <a class="icon-trash" v-on:click="deleteRequester(props.row.id)" style="cursor: pointer"></a>
          </p>

        </v-client-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import {getLeads, deleteLead} from "../../../api/leads";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  Vue.use(ClientTable);

  export default {
    name: 'Leads',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns:
          [
            'id',
            'organization.name',
            'name',
            'due_date',
            'anticipated_project_date',
            'leadType.name',
            'leadStatus.name',
            'leadSource.name',
            'stage.name',
            'requester.name',
            'owner.name',
            'creator.name',
            'editor.name',
            'note',
            'actions'
          ],
        data: [],
        message: '',
        success: false,
        res: [],
        options: {
          headings: {
            id: 'ID',
            'organization.name': 'Organization',
            name: 'Lead Name',
            due_date: 'Due Date',
            anticipated_project_date: 'Anticipated Project Date',
            'leadType.name': 'Lead Type',
            'leadStatus.name': 'Lead Status',
            'leadSource.name': 'Lead Source',
            'stage.name': 'Stage',
            'requester.name': 'Requester',
            'owner.name': 'Lead Owner',
            'creator.name': 'Lead Creator',
            'editor.name': 'Lead Editor',
            note: 'Note',
            actions: 'Actions'
          },
          sortable: [
            'id',
            'organization_id',
            'organization.name',
            'name',
            'due_date',
            'anticipated_project_date',
            'leadType.name',
            'leadStatus.name',
            'leadSource.name',
            'stage.name',
            'lead.name',
            'owner.name',
            'creator.name',
            'editor.name',
            'note'
          ],
          filterable: [
            'id',
            'organization_id',
            'organization.name',
            'name',
            'due_date',
            'anticipated_project_date',
            'leadType.name',
            'leadStatus.name',
            'leadSource.name',
            'stage.name',
            'lead.name',
            'owner.name',
            'creator.name',
            'editor.name',
            'note'
          ],
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
      deleteLead: function (id) {
        deleteLead(id)
            .then(() => this.leadDeletingSuccessful())
            .catch((request) => this.leadDeletingFailed(request));
      },
      leadDeletingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Lead is deleted.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.downloadData();
      },
      leadDeletingFailed(req) {
        this.errors = false;
        this.error = 'The Lead Deleting failed! ' + req;
        console.log(req);
      },
      downloadData() {
        getLeads()
          .then(response => {
            this.data = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
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
