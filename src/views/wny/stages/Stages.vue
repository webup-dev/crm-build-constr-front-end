<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Stages

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <a href="/#/admin/stage/create" class="btn btn-warning" style="float: right">Create Stage</a>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <!--            <a :href="'#/roles/' + props.row.id" class="icon-eye action-icon"></a>-->
            <a :href="'#/admin/stage/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>
            <a class="icon-trash" v-on:click="deleteStage(props.row.id)" style="cursor: pointer"></a>
          </p>

        </v-client-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import {getStages, deleteStage} from "../../../api/stages";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  Vue.use(ClientTable);

  export default {
    name: 'Stages',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: ['id', 'name', 'organization_id', 'organization.name', 'workflow_type', 'description', 'actions'],
        data: [],
        message: '',
        success: false,
        res: [],
        options: {
          headings: {
            id: 'ID',
            name: 'Name',
            organization_id: 'Organization ID',
            'organization.name': 'Organization',
            workflow_type: 'Workflow Type',
            description: 'Description',
            actions: 'Actions'
          },
          sortable: ['id', 'name', 'organization_id', 'organization.name', 'workflow_type', 'description'],
          filterable: ['id', 'name', 'organization_id', 'organization.name', 'workflow_type', 'description', ],
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
      deleteStage: function (id) {
        deleteStage(id)
            .then(() => this.stageDeletingSuccessful())
            .catch((request) => this.stageDeletingFailed(request));
      },
      stageDeletingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The Stage is deleted.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.downloadData();
      },
      stageDeletingFailed(req) {
        this.errors = false;
        this.error = 'The Stage Deleting failed! ' + req;
        console.log(req);
      },
      downloadData() {
        getStages()
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
