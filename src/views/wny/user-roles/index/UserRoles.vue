<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>User Roles Index
        <a href="#" class="badge badge-danger">Module Roles</a>

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <section v-if="props.row.role_ids != ''">
            <a :href="'#/user-roles/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>
            <a class="icon-trash" v-on:click="deleteUserRole(props.row.id)" style="cursor: pointer"></a>
            </section>
            <section v-if="props.row.role_ids == ''">
            <a  :href="'#/user-roles/create/' + props.row.id" class="icon-plus action-icon"></a>
            </section>
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
        name: 'UserRolesFinal',
        components: {
            ClientTable,
            Event
        },
        data: function () {
            return {
                columns: ['id', 'name', 'role_ids', 'role_names', 'actions'],
                data: [],
                message: '',
                success: false,
                res: [],
                options: {
                    headings: {
                        id: 'User ID',
                        name: 'User Name',
                        role_ids: 'Role IDs',
                        role_names: 'Role Names',
                        actions: 'Actions'
                    },
                    sortable: ['id', 'name', 'role_names'],
                    filterable: ['id', 'name', 'role_ids', 'role_names'],
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
            deleteUserRole: function (userId) {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.delete(API_URL + '/user-roles/' + userId, headers)
                    .then(request => this.userRoleDeletingSuccessful(request))
                    .catch((request) => this.userRoleDeletingFailed(request));
            },
            userRoleDeletingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('The User Roles are deleted.', 'success');

                this.downloadData();
            },
            userRoleDeletingFailed(req) {
                this.errors = false;
                this.error = 'The User Roles Deleting Failed! ' + req;
                console.log(req);
            },
            downloadData() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.get(API_URL + '/user-roles/full', headers)
                    .then(response => {
                        this.data = response.data.data;
                        this.message = response.data.message;
                        this.success = response.data.success;
                        console.log(this.message);
                        console.log(this.success);
                        console.log(this.data);
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
