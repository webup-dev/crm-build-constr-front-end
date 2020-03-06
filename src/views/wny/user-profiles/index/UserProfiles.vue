<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>User Profiles Index
        <a href="#" class="badge badge-danger">Module User Profiles</a>

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <a href="/#/admin/user-profiles/create" class="btn btn-warning" style="float: right">Create User</a>

        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <a :href="'#/admin/user-profiles/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>
            <a :href="'#/admin/user-profiles/' + props.row.id" class="icon-eye action-icon"></a>
            <a class="icon-trash" v-on:click="deleteUser(props.row.id)" style="cursor: pointer"></a>
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
    Vue.use(ClientTable)

    export default {
        name: 'UserProfiles',
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
            deleteUser: function (roleId) {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.delete(API_URL + '/user-profiles/' + roleId, headers)
                    .then(() => this.userDeletingSuccessful())
                    .catch((request) => this.userDeletingFailed(request));
            },
            userDeletingSuccessful() {
                this.errors = false;
                this.error = false;
                this.flash('The User is deleted.', 'success');

                this.downloadData();
            },
            userDeletingFailed(req) {
                this.errors = false;
                this.error = 'User Deleting failed! ' + req;
                console.log(req);
            },

            downloadData() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.get(API_URL + '/user-profiles', headers)
                    .then(response => {
                        this.data = this.formatDateOutput(response.data.data);
                        this.message = response.data.message;
                        this.success = response.data.success;
                        console.log(this.message);
                        console.log(this.success);
                        console.log("data: " + this.data);
                        console.log("start_date: " + this.data[1].start_date);
                    })
                    .catch(error => console.log(error));
            },
            formatDateOutput: function (obj) {
                obj.forEach(function (item, index) {
                    if (obj[index].start_date !== null) {
                        obj[index].start_date = moment(obj[index].start_date).format("YYYY-MM-DD")
                    }

                    if (obj[index].termination_date !== null) {
                        obj[index].termination_date = moment(obj[index].termination_date).format("YYYY-MM-DD")
                    }
                });

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
