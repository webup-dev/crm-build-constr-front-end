<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Controller <b><span style="color: red">{{controllerName}}</span></b>. Index of Methods&nbsp
        <a href="#" class="badge badge-danger">Module Methods</a>
        <a v-bind:href="'/#/methods/' + controllerId + '/create'" class="badge badge-warning" style="margin-left: 20px">Create Method</a>

        <div class="card-header-actions">
          <a
            href="https://github.com/vadis2/helper/blob/master/vuejs/admin-template/coreUI/components/05-table-final.md"
            rel="noopener noreferrer" target="_blank"
            className="card-header-action" class="btn btn-ghost-default">
            <small className="text-muted">docs</small>
          </a>
        </div>
      </b-card-header>
      <b-card-body>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <a :href="'#/methods/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>
            <a class="icon-trash" v-on:click="deleteMethod(props.row.id)" style="cursor: pointer"></a>
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

    const API_URL = process.env.VUE_APP_API_URL;
    Vue.use(ClientTable)

    export default {
        name: 'Methods',
        components: {
            ClientTable,
            Event
        },
        data: function () {
            return {
                columns: ['id', 'name', 'actions'],
                data: [],
                message: '',
                success: false,
                controllerName: '',
                controllerId: '',
                options: {
                    headings: {
                        id: 'ID',
                        name: 'Name',
                        actions: 'Actions'
                    },
                    sortable: ['id', 'name'],
                    filterable: ['id', 'name'],
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
            deleteMethod: function (methodId) {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.delete(API_URL + '/methods/' + methodId, headers)
                    .then(request => this.methodDeletingSuccessful(request))
                    .catch((request) => this.methodDeletingFailed(request));
            },
            methodDeletingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('The Method is deleted.', 'success');

                this.downloadData();
            },
            methodDeletingFailed(req) {
                this.errors = false;
                this.error = 'Method Deleting failed! ' + req;
            },
            downloadData() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.get(API_URL + '/methods/'  + this.$route.params.id, headers)
                    .then(response => {
                        this.data = response.data.data;
                        this.message = response.data.message;
                        this.success = response.data.success;
                    })
                    .catch(error => console.log(error));

                this.$http.get(API_URL + '/controllers/' + this.$route.params.id, headers)
                    .then(response => {
                        this.controllerName = response.data.data.name;
                        this.controllerId = response.data.data.id;
                    })
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
