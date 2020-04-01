<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Soft-Deleted Users
        <a href="#" class="badge badge-danger">Module User Profiles</a>

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
            <a class="icon-action-undo action-icon" v-on:click="restoreUser(props.row.id)" style="cursor: pointer"></a>
            <a class="icon-trash" v-on:click="permanentDeleteUser(props.row.id)" style="cursor: pointer"></a>
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

    const API_URL = process.env.VUE_APP_API_URL;
    const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

    Vue.use(ClientTable)

    export default {
        name: 'UserProfilesSoftDeleted',
        components: {
            ClientTable,
            Event
        },
        data: function () {
            return {
                columns: ['id', 'user_id', 'first_name', 'last_name', 'department_id', 'organization.name', 'status', 'start_date', 'termination_date', 'created_at', 'updated_at', 'actions'],
                data: [],
                message: '',
                success: false,
                options: {
                    headings: {
                        id: 'ID',
                        user_id: 'User ID',
                        first_name: 'First Name',
                        last_name: 'Last Name',
                        department_id: 'Department ID',
                        'organization.name': 'Department',
                        status: 'Status',
                        start_date: 'Start Date',
                        termination_date: 'Termination Date',
                        created_at: 'Created',
                        updated_at: 'Updated',
                        actions: 'Actions'
                    },
                    sortable: ['user_id', 'first_name', 'last_name', 'department_id', 'organization.name', 'status', 'start_date', 'termination_date', 'created_date', 'updated_date'],
                    filterable: ['user_id', 'first_name', 'last_name', 'department_id', 'organization.name', 'status', 'start_date', 'termination_date', 'created_date', 'updated_date'],
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
            permanentDeleteUser: function (roleId) {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.delete(API_URL + '/user-profiles/' + roleId + '/permanently', headers)
                    .then(() => this.userDeletingSuccessful())
                    .catch((request) => this.userDeletingFailed(request));
            },
            userDeletingSuccessful() {
                this.errors = false;
                this.error = false;
                this.flash('The User is permanently deleted.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

                this.downloadData();
            },
            userDeletingFailed(req) {
                this.errors = false;
                this.error = 'User Deleting failed! ' + req;
                console.log(req);
            },
            restoreUser: function (roleId) {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.put(API_URL + '/user-profiles/' + roleId + '/restore', headers)
                    .then(() => this.userRestoringSuccessful())
                    .catch((request) => this.userRestoringFailed(request));

            },
            userRestoringSuccessful() {
                this.errors = false;
                this.error = false;
                this.flash('The User is restored.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

                this.downloadData();
                // this.$router.replace(this.$route.query.redirect || '/admin/user-profiles')
            },
            userRestoringFailed(req) {
                this.errors = false;
                this.error = 'User Restoring failed! ' + req;
                console.log(req);
            },
            downloadData() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.get(API_URL + '/user-profiles/soft-deleted', headers)
                    .then(response => {
                        console.log('downloadData:');
                        console.log(response);
                        if (response.status === 204) {
                            console.log('204');
                            this.data = [];
                        } else {
                            this.data = this.formatDateOutput(response.data.data);
                            this.message = response.data.message;
                            this.success = response.data.success;
                        }
                    })
                    .catch(error => console.log(error));
            },
            formatDateOutput: function (obj) {
                if (obj) {
                    obj.forEach(function (item, index) {
                        if (obj[index].start_date && obj[index].start_date !== null) {
                            obj[index].start_date = moment(obj[index].start_date).format("YYYY-MM-DD")
                        }

                        if (obj[index].termination_date && obj[index].termination_date !== null) {
                            obj[index].termination_date = moment(obj[index].termination_date).format("YYYY-MM-DD")
                        }
                    });
                }

                return obj;
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
