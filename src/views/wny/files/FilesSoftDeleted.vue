<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Soft-Deleted Files
        <!--        <a href="#" class="badge badge-danger">Module Customers</a>-->

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <a class="icon-action-undo action-icon" v-on:click="restoreFile(props.row.id)"
               style="cursor: pointer"></a>
            <a class="icon-trash" v-on:click="permanentDeleteFile(props.row.id)" style="cursor: pointer"></a>
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
  import {softDeleted, restoreFile, permanentDestroyFile} from "../../../api/file";

  Vue.use(ClientTable)

  export default {
    name: 'FilesSoftDeleted',
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
      permanentDeleteFile: function (fileId) {
        permanentDestroyFile(fileId)
             .then(() => this.fileDeletingSuccessful())
             .catch((request) => this.fileDeletingFailed(request));
      },
      fileDeletingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The File data is deleted permanently.', 'success');

        this.downloadData();
      },
      fileDeletingFailed(req) {
        this.errors = false;
        this.error = 'File data deleting permanently failed! ' + req;
        console.log(req);
        this.flash(req.response.data.message + " Status code: " + req.response.data.code, 'error');
      },

      restoreFile: function (fileId) {
        restoreFile(fileId)
            .then(() => this.fileRestoringSuccessful())
            .catch((request) => this.fileRestoringFailed(request));

      },
      fileRestoringSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('The File Data is restored.', 'success');

        this.downloadData();
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
